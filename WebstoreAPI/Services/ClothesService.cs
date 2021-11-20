using System;
using MongoDB.Driver;
using WebstoreAPI.Models;
using System.Collections.Generic;
using System.Linq;
using WebstoreAPI.Interfaces;

namespace WebstoreAPI.Services
{
    public class ClothesService
    {
        private readonly IMongoCollection<Clothes> _clothes;
        
        public ClothesService(IClothesDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            if (database == null)
            {
                throw new ArgumentException("No database to retrieve");
            }
            
            _clothes = database.GetCollection<Clothes>(settings.ClothesCollectionName);
            
        }
        
        public List<Clothes> GetClothes()
        {
            var validList =  _clothes.Find(clothes => true).ToList();
            
            return validList.Where(cloth => 
                Enum.IsDefined(typeof(Gender), cloth.Gender) && 
                Enum.IsDefined(typeof(Category), cloth.Category) ).ToList();

        }

        public Clothes GetClothes(string id) =>
            _clothes.Find<Clothes>(clothes => clothes.Id == id).FirstOrDefault();
        
        public Clothes PostClothes(Clothes newClothes)
        {
            _clothes.InsertOne( newClothes );
            return newClothes;
        }

        public void PostReview(string id, Review review)
        {
            Clothes found = _clothes.Find<Clothes>(clothes => clothes.Id == id).FirstOrDefault();
            found.Reviews.Add(review);

            _clothes.ReplaceOne(clothing => clothing.Id == id, found);
        }

        public void UpdateClothes(string id, Clothes clothingIn) =>
            _clothes.ReplaceOne(clothing => clothing.Id == id, clothingIn);
        
        public void DeleteClothes(string id) =>
            _clothes.DeleteOne(clothing => clothing.Id == id);
    }
}