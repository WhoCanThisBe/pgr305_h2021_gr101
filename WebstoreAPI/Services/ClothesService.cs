using System;
using MongoDB.Driver;
using WebstoreAPI.Models;
using System.Collections.Generic;
using System.Linq;

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

            // var clothList = new List<Clothes>();
            // var list =  _clothes.Find(clothes => true).ToList();
            // var isValidGender = Enum.GetValues(typeof(Gender));
            //
            // foreach (var cloth in list)
            // {
            //     foreach (var gender in isValidGender)
            //     {
            //         if (cloth.Gender.Equals(gender.ToString()))
            //         {
            //             clothList.Add(cloth);
            //         }
            //     }
            //     
            // }
            var list =  _clothes.Find(clothes => true).ToList();
            
            return list.
                Where(cloth => Enum.IsDefined(typeof(Gender), cloth.Gender)).ToList();
            // return clothList.ToList();
            // return _clothes.Find(clothes => true).ToList();
        }

        public Clothes PostClothes(Clothes newClothes)
        {
            // TODO ADD TRY CATCH
            _clothes.InsertOne( newClothes );
            return newClothes;
        }
        
    }
}