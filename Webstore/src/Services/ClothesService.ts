import axios from "axios";
import { IProduct } from "../Interfaces/IProduct";

export const ClothesService = (function () {
  const _fallbackClothes: IProduct[] = [
    {
      brandName: "H&M",
      clothingName: "Gul Bukse",
      category: "bukse",
      size: "medium",
      stock: 10,
      color: "brown",
      gender: "female",
      image: "",
    },
    {
      brandName: "Armani",
      clothingName: "Blå Sko",
      category: "sko",
      size: "large",
      stock: 5,
      color: "blue",
      gender: "male",
      image: "",
    },
    {
      brandName: "Gucci",
      clothingName: "Brun Bag",
      category: "accesories",
      size: "small",
      stock: 10,
      color: "brown",
      gender: "unisex",
      image: "",
    },
  ];

  const urlToClothesController = "https://localhost:5001/Clothes";

  // Get list of all clothes from the database trough the API
  const getAll = async () => {
    try {
      const result = await axios.get(urlToClothesController);
      return result.data as IProduct[];
    } catch (error) {
      console.error(error);
      return _fallbackClothes;
    }
  };

  // Post a new clothing to the API, there it will be
  // converted to a C# object, then inserted in the database
  const postNewClothing = async (newClothes: IProduct) => {
    const result = await axios.post(urlToClothesController, newClothes);
  };

  return {
    getAll,
    postNewClothing,
  };
})();
