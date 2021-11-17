export interface IProduct {
  id?: string;
  brandName: string;
  clothingName: string;
  category: "Sko" | "Jakke" | "Genser" | "Bukse" | "Accesories";
  size: "Small" | "Medium" | "Large";
  stock: number;
  color: string;
  gender: "Female" | "Unisex" | "Male";
  image: string;
  amount: number;
}
