import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IProduct } from "../../Interfaces/IProduct";
import testLogo from "../../Images/logo512.png";

type Props = {
  garment: IProduct;
};

const ClothesItem: FC<Props> = ({ garment }) => {
  const history = useHistory();

  return (
    <Card className={"w-50"}>
      <Card.Img variant={"top"} src={testLogo} />
      <Card.Body>
        <Card.Text>{garment.brandName}</Card.Text>
        <Card.Title>{garment.clothingName}</Card.Title>
        <Button variant={"primary"} onClick={() => history.push("/cart")}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClothesItem;
