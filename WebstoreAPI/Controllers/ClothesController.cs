﻿using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
                   Enum.IsDefined(typeof(Size), newClothes.Size) &&
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

        [HttpPut("{id}")]
        public IActionResult UpdateClothes(string id, Clothes clothesIn)
        {
            var clothing = _clothesService.GetClothes(id);

            if (clothing == null)
            {
                return NotFound();
            }
            
            _clothesService.UpdateClothes(id, clothesIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
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
    }
}