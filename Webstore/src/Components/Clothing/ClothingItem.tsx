import React, { FC } from "react";
import { IProduct } from "../../Interfaces/IProduct";
import { Button, Card } from "react-bootstrap";
import testLogo from "../../Images/logo512.png";
import { useHistory } from "react-router-dom";

type Props = {
  clothing: IProduct;
};

const ClothingItem: FC<Props> = ({ clothing }) => {
  const history = useHistory();

  return (
    <Card className={"w-50"}>
      <Card.Img variant={"top"} src={testLogo} />
      <Card.Body>
        <Card.Text>{clothing.brandName}</Card.Text>
        <Card.Title>{clothing.clothingName}</Card.Title>
        <Button variant={"primary"} onClick={() => history.push("/cart")}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClothingItem;
