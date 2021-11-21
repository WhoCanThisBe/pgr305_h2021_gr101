import {IProduct} from "../Interfaces/IProduct";

export type CartContextType = {
    item: IProduct[];
    addToCart: (clickedItem: IProduct) => void;
    removeFromCart: (id: string | undefined, name: string | undefined) => void;
}
