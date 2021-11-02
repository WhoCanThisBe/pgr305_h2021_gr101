using Microsoft.AspNetCore.Mvc;
using WebstoreAPI.Models;
using System.Collections.Generic;
using WebstoreAPI.Services;

namespace WebstoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class ClothesController : ControllerBase
    {
        private readonly ClothesService _clothesService;

        public ClothesController(ClothesService clothesService)
        {
            _clothesService = clothesService;
        }

        [HttpGet]
        public IEnumerable<Clothes> GetClothes()
        {
            return _clothesService.GetClothes();
        }

        [HttpPost]
        public Clothes PostClothes(Clothes newClothes)
        {
            _clothesService.PostClothes(newClothes);
            return newClothes;
        }
    }
}