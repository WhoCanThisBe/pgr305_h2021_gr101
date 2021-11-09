﻿using System;
using Microsoft.AspNetCore.Mvc;
using WebstoreAPI.Models;
using System.Collections.Generic;
using WebstoreAPI.Interfaces;
using WebstoreAPI.Services;

namespace WebstoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class ClothesController : ControllerBase
    {
        private readonly ClothesService _clothesService;

        private bool Checker(Clothes newClothes)
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
        public IEnumerable<Clothes> GetClothes()
        {   
            //Get clothes need also a checker if contain the correct types
            return _clothesService.GetClothes();
        }

        [HttpPost]
        public Clothes PostClothes(Clothes newClothes)
        {
            if (!Checker(newClothes))
            {
                throw new ArgumentException("Input is not valid");
            } 
            
            _clothesService.PostClothes(newClothes);
            return newClothes;
        }
    }
}