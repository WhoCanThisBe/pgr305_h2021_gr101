import React, {FC, useEffect, useState} from "react";
import {ClothesContextType} from "../types/ClothesContextType";
import {IProduct} from "../Interfaces/IProduct";
import testLogo from "../Images/logo512.png";
import {ClothesService} from "../Services/ClothesService";

type Props = {
  children: React.ReactNode;
};

export const ClothesContext = React.createContext<ClothesContextType | null>(
  null
);

// Disse klærne blir lagt i databasen, men jeg lar de ligge her, i tilfelle noe må testes raskt,
// eller om man ikke skulle ha tilgang til databasen. Kommenter ut getClothes() fra useEffekt for å bruke disse
const ClothesProvider: FC<Props> = ({children}) => {
    const [clothes, setClothes] = useState<IProduct[]>([
        {
            id: "1",
            brandName: "Armani",
            clothingName: "Blå Jakke",
            categoryType: "jakke",
            size: "large",
            stock: 5,
            color: "blue",
            gender: "male",
            image: testLogo,
            amount: 0
        },
        {
            id: "2",
            brandName: "Gucci",
            clothingName: "Brun Bag",
            categoryType: "genser",
            size: "small",
            stock: 10,
            color: "brown",
            gender: "unisex",
            image: testLogo,
            amount: 0
        },
        {
            id: "3",
            brandName: "H&M",
            clothingName: "Gul Bukse",
            categoryType: "bukse",
            size: "medium",
            stock: 10,
            color: "brown",
            gender: "female",
            image: testLogo,
            amount: 0
        },
    ]);

    useEffect( () => {
        getClothes();
    })

    const getClothes = async () => {
        const _clothes = await ClothesService.getAll();
        setClothes( _clothes );
    }

  const fetchProductsByGender = (gender: IProduct["gender"]) => {
    return clothes.filter((garment) => garment.gender === gender);
  };

  const fetchProductsByCategory = (
    ...categories: IProduct["categoryType"][]
  ) => {
    return clothes.filter((garment) =>
      categories.includes(garment.categoryType)
    );
  };

  const clothesContext: ClothesContextType = {
    clothes: clothes,
    fetchProductsByGender,
    fetchProductsByCategory,
  };

  return (
    <ClothesContext.Provider value={clothesContext}>
      {children}
    </ClothesContext.Provider>
  );
};

export default ClothesProvider;
