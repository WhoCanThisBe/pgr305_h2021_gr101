import { IProduct } from "../Interfaces/IProduct";
import { IOrder } from "../Interfaces/IOrder";

export type ClothesContextType = {
  clothes: IProduct[];
  fetchProductsByGender: (gender: IProduct["gender"]) => IProduct[];
  fetchProductsByCategory: (
    ...categories: IProduct["category"][]
  ) => IProduct[];
  orders: IOrder[];
  placeNewOrder: (newOrder: IOrder) => void;
};
