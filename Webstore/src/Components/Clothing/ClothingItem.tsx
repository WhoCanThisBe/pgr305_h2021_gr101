import React, { FC } from "react";
import { IProduct } from "../../Interfaces/IProduct";
import { Card } from "react-bootstrap";

type Props = {
  clothing: IProduct;
  onNavigationToDetails: (product: IProduct) => void;
};

const ClothingItem: FC<Props> = ({ clothing, onNavigationToDetails }) => {
  return (
    <Card
      className={"clickable"}
      onClick={() => onNavigationToDetails(clothing)}
    >
      <Card.Img
        variant={"top"}
        src={
          clothing.image
            ? `https://localhost:5001/images/${clothing.image}`
            : require("../../Images/logo512.png").default
        }
      />
      <Card.Body>
        <Card.Text>{clothing.brandName}</Card.Text>
        <Card.Title>{clothing.clothingName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ClothingItem;
