import React, {FC, useState, useEffect} from "react";
import {IProduct} from "../Interfaces/IProduct";
import {CartContextType} from "../Types/CartContextType"

export const CartContext = React.createContext<CartContextType | null>(
        null
);

const getFromStorage = () => {
    const storedValues = localStorage.getItem('items');
    if(!storedValues) return [];
    return JSON.parse(storedValues);
};

const CartProvider: FC = ({ children }) => {

    const [cartItems, setCartItems] = useState<IProduct[]>(getFromStorage);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (clickedItem: IProduct) => {
        setCartItems(prev => {
            // Item already in cart
            const itemInCart = prev.find(item => {
                return item.id === clickedItem.id && 
                       item.size[0] === clickedItem.size[0];
            });

            //Set item amount
            if(itemInCart) {
                return prev.map(item =>
                    (item.id === clickedItem.id &&
                    item.size[0] === clickedItem.size[0])
                        ? { ...item, amount: item.amount + 1} // If item found update amount
                        : item                                // Else return items as is
                );
            }
            
            // First item added
            return [...prev, { ...clickedItem, amount: 1}]
        });
    };

    const removeFromCart = (id: string | undefined, name: string | undefined) => {
        setCartItems(prev =>
            prev.reduce((acc, item) => {
                // If item found, return accumulator to remove item
                if (item.id === id && item.size[0].name === name) {
                    if(item.amount === 1) return acc;
                    return [...acc, {...item, amount: item.amount - 1}];
                }else {
                    // Return item as is
                    return [...acc, item];
                }
            }, [] as IProduct[])
        );
    };

    const cartContext: CartContextType = {
        item: cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;