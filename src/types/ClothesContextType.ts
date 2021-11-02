import {IProduct} from "../Interfaces/IProduct";

export type ClothesContextType = {
    clothes: IProduct[];
    fetchProductsByGender: (gender: IProduct["gender"]) => IProduct[]
}