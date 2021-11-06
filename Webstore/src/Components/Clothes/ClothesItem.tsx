import React, { FC, useContext, useEffect, useState } from "react";
import { ButtonGroup, Card } from "react-bootstrap";
import { IProduct } from "../../Interfaces/IProduct";
import { ClothesContext } from "../../Contexts/ClothesContext";
import { ClothesContextType } from "../../Types/ClothesContextType";
import { IOrder } from "../../Interfaces/IOrder";
import { SizeDropdown } from "../SizeDropdown";
import { AddToCartButton } from "../AddToCartButton";

type Props = {
  garment: IProduct;
};

const ClothesItem: FC<Props> = ({ garment }) => {
  const { placeNewOrder, orders } = useContext(
    ClothesContext
  ) as ClothesContextType;

  const [order, setOrder] = useState<IOrder>({ products: [], timestamp: "" });

  const clearOrder = () => setOrder({ products: [], timestamp: "" });

  const [size, setSize] = useState("");

  useEffect(() => {
    if (orders.length === 0) return;

    // Clear state after adding a new order to the cart
    clearOrder();
    setSize("");
  }, [orders]);

  const handleAddNewOrder = (evt: React.MouseEvent<HTMLButtonElement>) => {
    // Copy info from currently rendered clothing/garment
    const productToOrder = garment;

    // Update it's size to the selected size
    productToOrder.size = size as IProduct["size"];

    // Prepare a new order that will be added to the cart
    const newOrder: IOrder = order;

    newOrder.products = [...order.products, productToOrder];
    newOrder.timestamp = new Date(Date.now()).toLocaleString();

    // Send the order to cart in context (simulation for now)
    placeNewOrder(newOrder);
  };

  return (
    <Card className={"w-50"}>
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
        <ButtonGroup>
          <SizeDropdown
            onSizeChange={(eventKey, _) => setSize(eventKey as string)}
            size={size}
          />
          <AddToCartButton isDisabled={!size} onClick={handleAddNewOrder} />
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ClothesItem;
