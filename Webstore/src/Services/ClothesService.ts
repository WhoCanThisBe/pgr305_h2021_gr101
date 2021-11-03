import axios from "axios";
import { IProduct } from "../Interfaces/IProduct";

export const ClothesService = (function(){

    const urlToClothesController = "https://localhost:5001/Clothes";

    // Get list of all clothes from the database trough the API
    const getAll = async () => {
        const result = await axios.get( urlToClothesController );
        return result.data as IProduct[];
    }

    // Post a new clothing to the API, there it will be
    // converted to a C# object, then inserted in the database
    const postNewClothing = async ( newClothes: IProduct ) => {
        const result = await axios.post( urlToClothesController, newClothes);
    }

    return {
        getAll,
        postNewClothing
    }

}());