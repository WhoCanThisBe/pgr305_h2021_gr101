import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../Contexts/ClothesContext";
import { ClothesContextType } from "../Types/ClothesContextType";
import { CartContext } from "../Contexts/CartContext";
import { CartContextType } from "../Types/CartContextType";
import { IProduct } from "../Interfaces/IProduct";
import { ButtonGroup, Col, Image, Row, Stack } from "react-bootstrap";
import { SizeDropdown } from "../Components/Shared/SizeDropdown";
import { AddToCartButton } from "../Components/Shared/AddToCartButton";
import { IImage } from "../Interfaces/IImage";

type ProductId = { id: string };

const ClothingDetails = () => {
  // Fetch "productId" sent here through `useHistory()`
  const location = useLocation<ProductId>();

  const imageUrl = "https://localhost:5001/images";

  const { fetchProductById } = useContext(ClothesContext) as ClothesContextType;
  const { addToCart } = useContext(CartContext) as CartContextType;

  const [clothing, setClothing] = useState<IProduct>(
    fetchProductById(location.state.id)
  );

  // State that will be "forwarded" to the size-dropdown
  const [selectedSize, setSelectedSize] = useState<IProduct["size"]>();

  // Effect that fetches the clothing we want to display details for -
  // it also updates the value when we get here on navigation from different clothes
  useEffect(() => {
    const foundClothing = fetchProductById(location.state.id);

    if (!foundClothing) return;

    setClothing(foundClothing);
  }, [location.state.id]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!clothing) return;

    setSelectedImage(clothing.images[0]?.name);
  }, []);

  const createClothingDetailsItem = () => {
    if (!clothing) return <h2>Loading details, please wait...</h2>;

    return (
      <Row xs={1} sm={1} md={3} className={"py-3"}>
        <Stack direction={"vertical"} gap={2}>
          {/* Image thunmbail that change the displayed image on click */}
          {clothing.images.map((image: IImage, index: number) => (
            <Col
              key={index}
              xs={1}
              sm={2}
              md={3}
              onClick={() => setSelectedImage(image.name)}
              className={"clickable"}
            >
              <Image src={`${imageUrl}/${image.name}`} thumbnail />
            </Col>
          ))}
        </Stack>

        {/* Selected image of the product */}
        <Col>
          {/* TODO: Remove "w-100" after replacing this with real images in the correct size */}
          {selectedImage && (
            <Image
              src={`https://localhost:5001/images/${selectedImage}`}
              rounded
              className={"w-100"}
            />
          )}
        </Col>

        <Col>
          <Stack direction={"vertical"} gap={3}>
            {/* Product details */}
            <Row>
              <header>
                <h2>{clothing.brandName}</h2>
                <h3>{clothing.clothingName}</h3>
              </header>
            </Row>
            <Row>
              <p>
                Color: <strong>{clothing.color}</strong>
              </p>
            </Row>

            {/* ButtonGroup with "actions" */}
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
                  onClick={() => {
                    addToCart({ ...clothing, size: selectedSize! });
                    setSelectedSize(undefined);
                  }}
                />
              </ButtonGroup>
            </Row>
          </Stack>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <h1 className={"my-3"}>Clothing details for {clothing?.clothingName}</h1>
      {createClothingDetailsItem()}
    </>
  );
};

export default ClothingDetails;
