import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../Contexts/ClothesContext";
import { ClothesContextType } from "../Types/ClothesContextType";
import { CartContext } from "../Contexts/CartContext";
import { CartContextType } from "../Types/CartContextType";
import { IProduct } from "../Interfaces/IProduct";
import { ButtonGroup, Col, Row, Stack } from "react-bootstrap";
import { SizeDropdown } from "../Components/Shared/SizeDropdown";
import { AddToCartButton } from "../Components/Shared/AddToCartButton";

const ClothingDetails = () => {
  const location = useLocation<{ id: string }>();
  const { fetchProductById } = useContext(ClothesContext) as ClothesContextType;
  const { addToCart } = useContext(CartContext) as CartContextType;

  const [clothing, setClothing] = useState<IProduct>(
    fetchProductById(location.state.id)
  );

  const [selectedSize, setSelectedSize] = useState<IProduct["size"]>();

  useEffect(() => {
    const foundClothing = fetchProductById(location.state.id);

    if (!foundClothing) return;

    setClothing(foundClothing);
  }, [location.state.id]);

  const createClothingDetailsItem = () => {
    if (!clothing) return <h2>Loading details, please wait...</h2>;

    return (
      <>
        <Row xs={1} sm={1} md={2} lg={3}>
          <Col>
            <p>Thumbnails of product here</p>
            <p>Thumbnails of product here</p>
          </Col>
          <Col>
            <p>Large image of product here</p>
          </Col>
          <Col>
            <Stack direction={"vertical"} gap={3}>
              <Row>
                <header>
                  <h2>{clothing.brandName}</h2>
                  <h3>{clothing.clothingName}</h3>
                </header>
              </Row>
              <Row>
                <p>
                  Farge: <strong>{clothing.color}</strong>
                </p>
              </Row>
              <Row>
                <ButtonGroup>
                  <SizeDropdown
                    onSizeChange={(eventKey, _) =>
                      setSelectedSize(eventKey as IProduct["size"])
                    }
                    size={selectedSize as IProduct["size"]}
                  />
                  <AddToCartButton
                    isDisabled={!selectedSize}
                    onClick={() =>
                      addToCart({ ...clothing, size: selectedSize! })
                    }
                  />
                </ButtonGroup>
              </Row>
            </Stack>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <h1>Clothing details for {clothing?.clothingName} </h1>
      {createClothingDetailsItem()}
    </>
  );
};

export default ClothingDetails;
