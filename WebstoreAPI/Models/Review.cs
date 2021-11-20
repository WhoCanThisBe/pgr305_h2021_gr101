using System.Collections.Generic;
using WebstoreAPI.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebstoreAPI.Models
{
    public class Review : IReview
    {
        public string Text { get; set; }
    }
}