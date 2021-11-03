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
        public string Category { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public int Stock { get; set; }
        public string Image { get; set; }
    }
}