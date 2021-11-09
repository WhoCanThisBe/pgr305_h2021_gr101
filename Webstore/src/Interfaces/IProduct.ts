export interface IProduct {
  id?: string;
  brandName: string;
  clothingName: string;
  category: "sko" | "jakke" | "genser" | "bukse" | "accesories";
  size: "small" | "medium" | "large";
  stock: number;
  color: string;
  gender: "female" | "unisex" | "male";
  image: string;
}
