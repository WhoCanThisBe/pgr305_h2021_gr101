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
        axios.post(urlToClothesController, newClothes);
        axios({
          url: urlToImageUploadController,
          method: "POST",
          data: formData,
          headers: {"Content-Type": "multipart/form-data"}
        })
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
