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
                Enum.IsDefined(typeof(Category), cloth.Category) && 
                Enum.IsDefined(typeof(Size), cloth.Size) ).ToList();

        }

        public Clothes PostClothes(Clothes newClothes)
        {
            // TODO ADD TRY CATCH
            _clothes.InsertOne( newClothes );
            return newClothes;
        }
        
    }
}