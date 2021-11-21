import React, {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import CartItem from "./CartItem";
import {Row} from "react-bootstrap";

type Props = {
    cartItems: IProduct[];
    addToCart: (clickedItem: IProduct) => void;
    removeFromCart: (id: string | undefined, name: string | undefined) => void;
}

const CartList: FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

    const createCartList = () => {
        return cartItems?.map((clothing: IProduct, index: number) => {
            return (
                <Row key={index}>
                    <CartItem
                        clothing={clothing}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                </Row>
            )
        })
    };

    return (
        <section>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {createCartList()}
        </section>
    )
};

export default CartList;