export interface IProduct {
  itemName?: number;
  brandName: string;
  clothingName: string;
  categoryType: "sko" | "jakke" | "genser" | "bukse";
  size: "small" | "medium" | "large";
  stock: number;
  color: string;
  gender: "female" | "unisex" | "male";
}
