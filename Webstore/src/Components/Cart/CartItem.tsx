import {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Card, Col, Row} from "react-bootstrap";

type Props = {
    clothing: IProduct;
    addToCart: (clickedItem: IProduct) => void;
    removeFromCart: (id: string | undefined, name: string) => void;
}

const CartItem: FC<Props> = ({clothing, addToCart, removeFromCart}) => {
    return (
        <Card>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Card.Img className={"card-img-top-cart"}
                              src={`https://localhost:5001/images/${clothing.images[0].name}`}/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Text>Brand Name: {clothing.brandName}</Card.Text>
                        <Card.Text>{clothing.category} {clothing.color}</Card.Text>
                        <Card.Text>Size: {clothing.size[0].name}</Card.Text>
                        <Button
                            variant={"success"}
                            onClick={() => addToCart(clothing)}
                        >
                            Add
                        </Button>
                        <Button
                            variant={"danger"}
                            onClick={() => removeFromCart(clothing.id, clothing.size[0].name)}
                        >
                            Remove
                        </Button>
                    </Card.Body>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Text>Quantity: {clothing.amount}</Card.Text>
                        <Card.Text>Price: {clothing.priceNok * clothing.amount}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;