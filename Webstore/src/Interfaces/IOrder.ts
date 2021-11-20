import {IProduct} from "./IProduct";

export interface IOrder {
    id?: string;
    products: IProduct[];
    timestamp: string;
}
