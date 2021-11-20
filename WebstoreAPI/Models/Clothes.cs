using System.Collections.Generic;
using WebstoreAPI.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebstoreAPI.Models
{
    public class Clothes : IClothes
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string BrandName { get; set; }
        public string ClothingName { get; set; }
        public string Category { get; set;}
        public List<Size> Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public int PriceNok { get; set; }
        public List<Image> Images { get; set; }
        public List<Review> Reviews { get; set; }
    }
}