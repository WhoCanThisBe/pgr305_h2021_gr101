import React, {FC} from "react";
import {Button, Card} from "react-bootstrap";
import {IProduct} from "../../Interfaces/IProduct";
import {CartContext} from "../../Contexts/CartContext";
import {CartContextType} from "../../types/CartContextType";

type Props = {
    garment: IProduct;
};

const ClothesItem: FC<Props> = ({garment}) => {
    const cartContext = React.useContext(CartContext) as CartContextType;

    return (
        <Card className={"w-50"}>
            <Card.Img variant={"top"} src={`https://localhost:5001/images/${garment.image}`}/>
            <Card.Body>
                <Card.Text>{garment.brandName}</Card.Text>
                <Card.Title>{garment.clothingName}</Card.Title>
                <Button variant={"primary"} onClick={() => cartContext.addToCart(garment)}>
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ClothesItem;
