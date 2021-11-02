import React, {FC, useState} from "react";
import {ClothesContextType} from "../types/ClothesContextType";
import {IProduct} from "../Interfaces/IProduct";

type Props = {
    children: React.ReactNode;
};

export const ClothesContext = React.createContext<ClothesContextType | null>(
    null
);

const ClothesProvider: FC<Props> = ({children}) => {
    const [clothes, setClothes] = useState<IProduct[]>([
        {
            brandName: "Armani",
            clothingName: "Blå Jakke",
            categoryType: "jakke",
            size: "large",
            stock: 5,
            color: "blue",
            gender: "male",
        },
        {
            brandName: "Gucci",
            clothingName: "Brun Bag",
            categoryType: "genser",
            size: "small",
            stock: 10,
            color: "brown",
            gender: "unisex",
        },
        {
            brandName: "H&M",
            clothingName: "Gul Bukse",
            categoryType: "bukse",
            size: "medium",
            stock: 10,
            color: "brown",
            gender: "female",
        },
    ]);

    const fetchProductsByGender = (gender: IProduct["gender"]) => {
        return clothes.filter((garment) => garment.gender === gender);
    };

    const clothesContext: ClothesContextType = {
        clothes: clothes,
        fetchProductsByGender,
    };

    return (
        <ClothesContext.Provider value={clothesContext}>
            {children}
        </ClothesContext.Provider>
    );
};

export default ClothesProvider;
