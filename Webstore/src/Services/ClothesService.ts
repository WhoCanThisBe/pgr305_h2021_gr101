import axios from "axios";
import { IProduct } from "../Interfaces/IProduct";

export const ClothesService = (function () {
  const _fallbackClothes: IProduct[] = [
    {
      brandName: "H&M",
      clothingName: "Gul Bukse",
      category: "Underdel",
      size: [
        {
          name: "Small",
          stock: 10,
        }
      ],
      stock: 10,
      priceNok: 0,
      color: "brown",
      gender: "Female",
      images: [],
      amount: 0
    },
    {
      brandName: "Armani",
      clothingName: "Blå Sko",
      category: "Sko",
      size: [
        {
          name: "Small",
          stock: 10,
        }
      ],
      stock: 5,
      priceNok: 0,
      color: "blue",
      gender: "Male",
      images: [],
      amount: 0
    },
    {
      brandName: "Gucci",
      clothingName: "Brun Bag",
      category: "Accesories",
      size: [
        {
          name: "Small",
          stock: 10,
        }
      ],
      stock: 10,
      priceNok: 0,
      color: "brown",
      gender: "Unisex",
      images: [],
      amount: 0
    },
  ];

  const urlToClothesController = "https://localhost:5001/Clothes";
  const urlToImageUploadController = "https://localhost:5001/ImageUpload/SaveImage";

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

  // Post a new clothing to the API with an image
  const postClothing = (newClothes: IProduct, image: File ) => {
    

    let formData = new FormData();
    formData.append( "file", image);

    if(formData)
    {
      try {
        axios({
          url: urlToImageUploadController,
          method: "POST",
          data: formData,
          headers: {"Content-Type": "multipart/form-data"}
        })
        axios.post(urlToClothesController, newClothes);

      } catch(error) {
        console.error(error);
        return _fallbackClothes;
      }
    }
  };

  const putClothing = (newClothes: IProduct) => {
    try{
      axios.put(`${urlToClothesController}/${newClothes.id}`, newClothes);
    }catch (error){
      console.error(error);
    }
  };

  const deleteClothing = (id: string | undefined) =>{
    if(id) {
      axios.delete(`${urlToClothesController}/${id}`)
          .catch(error => {
            console.error(error);
          });
    }
  };

  return {
    getAll,
    postClothing,
    putClothing,
    deleteClothing
  };
})();
