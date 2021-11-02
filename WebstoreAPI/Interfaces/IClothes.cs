namespace WebstoreAPI.Interfaces
{
    public interface IClothes
    {
        string Id { get; set; }
        string BrandName { get; set; }
        string ClothingName { get; set; }
        string Category { get; set; }
        string Size { get; set; }
        string Color { get; set; }
        string Gender { get; set; }
        int Stock { get; set; }
    }
}