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
            _clothes = database.GetCollection<Clothes>(settings.ClothesCollectionName);
        }
        
        public List<Clothes> GetClothes()
        {
            return _clothes.Find(clothes => true).ToList();
        }

        public Clothes PostClothes(Clothes newClothes)
        {
            // TODO ADD TRY CATCH
            _clothes.InsertOne( newClothes );
            return newClothes;
        }
        
    }
}