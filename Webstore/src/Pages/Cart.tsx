import React, {FC} from "react";
import CartList from "../Components/Cart/CartList";
import CartProvider, {CartContext} from "../Contexts/CartContext";
import {CartContextType} from "../Types/CartContextType";
import {RouteComponentProps} from "react-router";

const Cart: FC<RouteComponentProps> = () => {

    const cartContext = React.useContext(CartContext) as CartContextType
        return (
            <section>
                <h1>Cart</h1>
                <CartProvider>
                    <CartList
                        cartItems={cartContext.item}
                        addToCart={cartContext.addToCart}
                        removeFromCart={cartContext.removeFromCart}
                    />
                </CartProvider>
            </section>
        );
};

export default Cart;