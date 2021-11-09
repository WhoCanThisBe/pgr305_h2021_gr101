import React, { FC, useEffect, useState } from "react";
import { ClothesContextType } from "../Types/ClothesContextType";
import { IProduct } from "../Interfaces/IProduct";
import testLogo from "../Images/logo512.png";
import { ClothesService } from "../Services/ClothesService";
import { IOrder } from "../Interfaces/IOrder";


type Props = {
  children: React.ReactNode;
};

export const ClothesContext = React.createContext<ClothesContextType | null>(
  null
);

// Disse klærne blir lagt i databasen, men jeg lar de ligge her, i tilfelle noe må testes raskt,
// eller om man ikke skulle ha tilgang til databasen. Kommenter ut getClothes() fra useEffekt for å bruke disse
const ClothesProvider: FC<Props> = ({ children }) => {
  const [clothes, setClothes] = useState<IProduct[]>([
    {
      brandName: "H&M",
      clothingName: "Gul Bukse",
      category: "bukse",
      size: "medium",
      stock: 10,
      color: "brown",
      gender: "female",
      image: testLogo,
    },
    {
      brandName: "Armani",
      clothingName: "Blå Sko",
      category: "sko",
      size: "large",
      stock: 5,
      color: "blue",
      gender: "male",
      image: testLogo,
    },
    {
      brandName: "Gucci",
      clothingName: "Brun Bag",
      category: "accesories",
      size: "small",
      stock: 10,
      color: "brown",
      gender: "unisex",
      image: testLogo,
    },
  ]);

  // TODO: Discuss if this should be moved somewhere else (like in it's own "...Provider" and "...ContextType"-setup
  // Cart -> Orders -> [Order: { id, products }, ...]
  const [cart, setCart] = useState<{
    orders: IOrder[];
  }>({
    orders: [],
  });

  const placeNewOrder = (order: IOrder) => {
    // TODO: Check if it's already in the cart (based on orders with the same id...)
    const updatedOrders = [...cart.orders, order];

    console.log(updatedOrders);

    setCart((prevCart) => ({
      ...prevCart,
      orders: updatedOrders,
    }));
  };

  useEffect(() => {
    getClothes();
  }, []);

  const getClothes = async () => {
    const _clothes = await ClothesService.getAll();
    setClothes(_clothes);
  };

  const fetchProductsByGender = (gender: IProduct["gender"]) => {
    return clothes.filter((garment) => garment.gender === gender);
  };

  const fetchProductsByCategory = (...categories: IProduct["category"][]) => {
    return clothes.filter((garment) => categories.includes(garment.category));
  };

  const clothesContext: ClothesContextType = {
    clothes: clothes,
    fetchProductsByGender,
    fetchProductsByCategory,
    orders: cart.orders,
    placeNewOrder,
  };

  return (
    <ClothesContext.Provider value={clothesContext}>
      {children}
    </ClothesContext.Provider>
  );
};

export default ClothesProvider;
