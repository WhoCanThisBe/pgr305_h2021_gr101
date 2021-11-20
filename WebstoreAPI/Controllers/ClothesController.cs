using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using WebstoreAPI.Models;
using WebstoreAPI.Interfaces;
using WebstoreAPI.Services;

namespace WebstoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class ClothesController : ControllerBase
    {
        private readonly ClothesService _clothesService;

        private bool isValid(Clothes newClothes)
        {
            return Enum.IsDefined(typeof(Category), newClothes.Category) &&
                   Enum.IsDefined(typeof(Gender), newClothes.Gender);
        }

        public ClothesController(ClothesService clothesService)
        {
            _clothesService = clothesService;
        }

        [HttpGet]
        public ActionResult<List<Clothes>> GetClothes() =>
            _clothesService.GetClothes();

        [HttpGet("{id}")]
        public ActionResult<Clothes> GetClothes(string id)
        {
            var clothes = _clothesService.GetClothes(id);

            if (clothes == null)
            {
                return NotFound();
            }

            return clothes;
        }

        [HttpPost]
        public IActionResult PostClothes(Clothes newClothes)
        {
            if (!isValid(newClothes))
            {
                throw new ArgumentException("Input is not valid");
            } 
            
            _clothesService.PostClothes(newClothes);
            return CreatedAtAction(nameof(PostClothes), new {id = newClothes.Id}, newClothes);
        }

        [HttpPost("{id}/review")]
        public IActionResult PostReview(string id, Review review)
        {
            _clothesService.PostReview(id, review);

            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult UpdateClothes(string id, Clothes clothesIn)
        {
            if (id != clothesIn.Id)
            {
                return BadRequest();
            }
            
            var clothing = _clothesService.GetClothes(id);

            if (clothing is null)
                return NotFound();

            _clothesService.UpdateClothes(id, clothesIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult DeleteClothes(string id)
        {
            var clothing = _clothesService.GetClothes(id);

            if (clothing == null)
            {
                return NotFound();
            }
            
            _clothesService.DeleteClothes(clothing.Id);
            
            return NoContent();
        }

        [HttpDelete("{name}")]
        public IActionResult DeleteClothingImage(string name)
        {
            var imageRoot = "./wwwroot/images";
            var imageName = name;

            if (imageName == null)
            {
                return NotFound();
            }
            
            try
            {
                var clothingImageRoot = Path.Combine(imageRoot, name);
                
                System.IO.File.Delete(clothingImageRoot);
                
            }catch (DirectoryNotFoundException dirNotFound)
            {
                Console.WriteLine(dirNotFound.Message);
            }

            return NoContent();
        }
        
    }
}