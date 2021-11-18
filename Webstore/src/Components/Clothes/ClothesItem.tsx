import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { IProduct } from "../../Interfaces/IProduct";

type Props = {
  garment: IProduct;
  onNavigationToDetails: (product: IProduct) => void;
};

const ClothesItem: FC<Props> = ({ garment, onNavigationToDetails }) => {
  return (
    <Card
      className={"clickable"}
      onClick={() => onNavigationToDetails(garment)}
    >
      <Card.Img
        variant={"top"}
        src={
          garment.image
            ? `https://localhost:5001/images/${garment.image}`
            : require("../../Images/logo512.png").default
        }
      />
      <Card.Body>
        <Card.Text>{garment.brandName}</Card.Text>
        <Card.Title>{garment.clothingName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ClothesItem;
