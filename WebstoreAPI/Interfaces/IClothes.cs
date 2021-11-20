using System.Collections.Generic;
using WebstoreAPI.Models;

namespace WebstoreAPI.Interfaces
{
    public interface IClothes
    {
        string Id { get; set; }
        string BrandName { get; set; }
        string ClothingName { get; set; }
        List<Size> Size { get; set; }
        string Color { get; set; }
        string Gender { get; set; }
        int PriceNok { get; set; }
        List<Image> Images { get; set; }
    }
}