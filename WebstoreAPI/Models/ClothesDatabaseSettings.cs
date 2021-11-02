namespace WebstoreAPI.Models
{
    public interface IClothesDatabaseSettings
    {
        string ClothesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class ClothesDatabaseSettings : IClothesDatabaseSettings
    {
        public string ClothesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}