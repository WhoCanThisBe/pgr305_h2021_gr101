import axios from "axios";
import { IProduct } from "../Interfaces/IProduct";

export const ClothesService = (function () {
  const _fallbackClothes: IProduct[] = [
    {
      brandName: "H&M",
      clothingName: "Gul Bukse",
      category: "Bukse",
      size: "Medium",
      stock: 10,
      color: "brown",
      gender: "Female",
      image: "",
    },
    {
      brandName: "Armani",
      clothingName: "Blå Sko",
      category: "Sko",
      size: "Large",
      stock: 5,
      color: "blue",
      gender: "Male",
      image: "",
    },
    {
      brandName: "Gucci",
      clothingName: "Brun Bag",
      category: "Accesories",
      size: "Small",
      stock: 10,
      color: "brown",
      gender: "Unisex",
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
