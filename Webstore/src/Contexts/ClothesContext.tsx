import React, { FC, useEffect, useState } from "react";
import { IProduct } from "../Interfaces/IProduct";
import { ClothesService } from "../Services/ClothesService";
import { IOrder } from "../Interfaces/IOrder";
import {ClothesContextType} from "../Types/ClothesContextType";

type Props = {
  children: React.ReactNode;
};

export const ClothesContext = React.createContext<ClothesContextType | null>(
  null
);

// Disse klærne blir lagt i databasen, men jeg lar de ligge her, i tilfelle noe må testes raskt,
// eller om man ikke skulle ha tilgang til databasen. Kommenter ut getClothes() fra useEffekt for å bruke disse
const ClothesProvider: FC<Props> = ({ children }) => {
  const [clothes, setClothes] = useState<IProduct[]>([]);

  useEffect(() => {
    getClothes();
  }, []);

  const getClothes = async () => {
    const _clothes = await ClothesService.getAll();
    setClothes(_clothes);
  };

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

    setCart((prevCart) => ({
      ...prevCart,
      orders: updatedOrders,
    }));
  };

  const fetchProductsByGender = (gender: IProduct["gender"]) => {
    return clothes.filter((garment) => garment.gender === gender);
  };

  const fetchProductsByCategory = (...categories: IProduct["category"][]) => {
    return clothes.filter((garment) => categories.includes(garment.category));
  };

  const fetchProductById = (id: string) => {
    return clothes.find( clothing => clothing.id === id ) as IProduct
  };

  const clothesContext: ClothesContextType = {
    clothes: clothes,
    fetchProductsByGender,
    fetchProductsByCategory,
    fetchProductById,
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
