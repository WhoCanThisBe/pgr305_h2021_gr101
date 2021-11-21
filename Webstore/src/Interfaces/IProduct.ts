import {IImage} from "./IImage";
import {ISize} from "./ISize";
import {IReview} from "./IReview";

export interface IProduct {
    id?: string;
    brandName: string;
    clothingName: string;
    category: "Sko" | "Overdel" | "Underdel" | "Accesories";
    size: ISize[];
    stock: number;
    priceNok: number;
    color: string;
    gender: "Female" | "Unisex" | "Male";
    images: IImage[];
    amount: number;
    reviews: IReview[];
}
