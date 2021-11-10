export interface IProduct {
    id?: string;
    brandName: string;
    clothingName: string;
    categoryType: "sko" | "jakke" | "genser" | "bukse";
    size: "small" | "medium" | "large";
    stock: number;
    color: string;
    gender: "female" | "unisex" | "male";
    image: string;
    amount: number;
}
