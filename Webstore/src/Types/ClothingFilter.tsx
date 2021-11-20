import { IProduct } from "../Interfaces/IProduct";

export type ClothingFilter = {
  gender: IProduct["gender"];
  category: {
    name: string;
    productTypes: IProduct["category"][];
  };
};