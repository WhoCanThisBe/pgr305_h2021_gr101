import {IProduct} from "../interfaces/IProduct";

export type ClothesContextType = {
    clothes: IProduct[];
    fetchProductsByGender: (gender: IProduct["gender"]) => IProduct[]
}