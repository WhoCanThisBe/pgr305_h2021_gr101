export interface IProduct {
    itemName?: number;
    brandName: string;
    clothingName: string;
    categoryType: "Sko" | "Jakke" | "Genser" | "Bukse";
    size: "Small" | "Medium" | "Large";
    stock: number;
    color: string;
    gender: "Female" | "Unisex" | "Male";
}