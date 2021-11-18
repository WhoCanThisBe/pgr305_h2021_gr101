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

type ProductId = { id: string };

const ClothingDetails = () => {
  // Fetch "productId" sent here through `useHistrory()`
  const location = useLocation<ProductId>();

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

  // Temporary placeholders for testing
  const [thumbnails, setThumbnails] = useState([""]);

  const [images, setImages] = useState([""]);

  useEffect(() => {
    setImages([
      "https://images.pexels.com/photos/10029377/pexels-photo-10029377.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      "https://images.pexels.com/photos/10029383/pexels-photo-10029383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/10029381/pexels-photo-10029381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/10029385/pexels-photo-10029385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ]);

    setThumbnails(Array(4).fill(require("../Images/logo512.png").default));
  }, []);

  useEffect(() => {
    // Don't continue if the images-array only contain the default value ("")
    if (!images[0]) return;

    setSelectedImage(images[0]);
  }, [images]);

  const [selectedImage, setSelectedImage] = useState("");

  const createClothingDetailsItem = () => {
    if (!clothing) return <h2>Loading details, please wait...</h2>;

    return (
      <Row xs={1} sm={1} md={3} className={"py-3"}>
        <Stack direction={"vertical"} gap={2}>
          {/* Image thunmbail that change the displayed image on click */}
          {thumbnails.map((thumbnail, index: number) => (
            <Col
              key={index}
              xs={1}
              sm={2}
              md={3}
              onClick={() => setSelectedImage(images[index])}
              className={"clickable"}
            >
              <Image src={thumbnail} thumbnail />
            </Col>
          ))}
        </Stack>

        {/* Selected image of the product */}
        <Col>
          {/* TODO: Remove "w-100" after replacing this with real images in the correct size */}
          {selectedImage && (
            <Image src={selectedImage} rounded className={"w-100"} />
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
