import {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Card, Col, Row} from "react-bootstrap";

type Props = {
    clothing: IProduct;
    addToCart: (clickedItem: IProduct) => void;
    removeFromCart: (id: string | undefined) => void;
}

// TODO Siden kan trenge litt styling

const CartItem: FC <Props> = ({ clothing, addToCart, removeFromCart }) => {

    return (
        <Card>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Card.Img className={"card-img-top-cart"} src={`https://localhost:5001/images/${clothing.image}`}/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Text>{clothing.brandName}</Card.Text>
                        <Card.Text>{clothing.categoryType} {clothing.color}</Card.Text>
                        <Card.Text>{clothing.size}</Card.Text>
                        <Button
                            variant={"contained"}
                            onClick={() => removeFromCart(clothing.id)}
                        >
                            Remove
                        </Button>
                        <Button
                            variant={"contained"}
                            onClick={() => addToCart(clothing)}
                        >
                            Add
                        </Button>
                    </Card.Body>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Text>{clothing.amount}</Card.Text>
                        <Card.Text>Price: placeholder</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;