import {IImage} from "./IImage";

export interface IProduct {
  id?: string;
  brandName: string;
  clothingName: string;
  category: "Sko" | "Overdel" | "Underdel" | "Accesories";
  size: "Small" | "Medium" | "Large";
  stock: number;
  priceNok: number;
  color: string;
  gender: "Female" | "Unisex" | "Male";
  images: IImage[];
  amount: number;
}
