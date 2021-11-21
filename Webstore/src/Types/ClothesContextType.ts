import {IProduct} from "../Interfaces/IProduct";

export type ClothesContextType = {
    clothes: IProduct[];
    getClothes: () => Promise<IProduct[]>;
    fetchProductsByGender: (gender: IProduct["gender"]) => IProduct[];
    fetchProductsByCategory: (
        ...categories: IProduct["category"][]
    ) => IProduct[];
    fetchProductById: (id: string) => IProduct;
};
