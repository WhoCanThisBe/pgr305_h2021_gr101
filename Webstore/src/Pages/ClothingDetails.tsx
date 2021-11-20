import {useLocation} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {ClothesContext} from "../Contexts/ClothesContext";
import {ClothesContextType} from "../Types/ClothesContextType";
import {CartContext} from "../Contexts/CartContext";
import {CartContextType} from "../Types/CartContextType";
import {IProduct} from "../Interfaces/IProduct";
import {Button, ButtonGroup, Col, Form, Image, Row, Stack} from "react-bootstrap";
import {SizeDropdown} from "../Components/Shared/SizeDropdown";
import {AddToCartButton} from "../Components/Shared/AddToCartButton";
import {IImage} from "../Interfaces/IImage";
import {ISize} from "../Interfaces/ISize";
import {useParams} from "react-router";
import ReviewItem from "../Components/Clothes/ReviewItem";
import {ClothesService} from "../Services/ClothesService";
import {IReview} from "../Interfaces/IReview";

type ClothingParams = {
    clothingId: string;
}

const ClothingDetails = () => {
    // Fetch "productId" sent here through `useHistory()`
    //const location = useLocation<ProductId>();
    const { clothingId } = useParams<ClothingParams>();

    const imageUrl = "https://localhost:5001/images";

    const {fetchProductById, getClothes} = useContext(ClothesContext) as ClothesContextType;
    const {addToCart} = useContext(CartContext) as CartContextType;

    const [clothing, setClothing] = useState<IProduct>(
        fetchProductById(clothingId)
    );

    // State that will be "forwarded" to the size-dropdown
    const [sizes, setSizes] = useState<ISize[]>([]);

    const [selectedSize, setSelectedSize] = useState<ISize>();

    // Effect that fetches the clothing we want to display details for -
    // it also updates the value when we get here on navigation from different clothes
    useEffect(() => {
        const foundClothing = fetchProductById(clothingId);
        
        // Simple but a little dirty fix to fix refresh
        if (!foundClothing) {
            getClothes().then((_clothes) => {
                const foundClothing = _clothes.find((clothing) => clothing.id === clothingId) as IProduct;

                setClothing(foundClothing);
                setSizes(foundClothing.size);
                setReviews(foundClothing.reviews);
            });
            
            return;
        }

        setClothing(foundClothing);
        setSizes(foundClothing.size);
        setReviews(foundClothing.reviews);
    }, []);

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        setSelectedImage(clothing?.images[0].name);
    }, [clothing]);

    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState<IReview[]>([]);
    
    const createReview = (element: React.FormEvent) => {
        element.preventDefault();
        
        const newReview: IReview = {text: review};
        
        ClothesService.postReview(clothingId, newReview);
        
        setReviews([...reviews, newReview]);
    }

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
                            <Image src={`${imageUrl}/${image.name}`} thumbnail/>
                        </Col>
                    ))}
                </Stack>

                {/* Selected image of the product */}
                <Col>
                    {/* TODO: Remove "w-100" after replacing this with real images in the correct size */}
                    {selectedImage && (
                        <Image src={`https://localhost:5001/images/${selectedImage}`} rounded className={"w-100"}/>
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
                                    onSizeChange={(size) => {
                                        setSelectedSize(size);
                                    }}
                                    clothingSizes={sizes}
                                />
                                <AddToCartButton
                                    isDisabled={!selectedSize}
                                    onClick={() => {
                                        addToCart({...clothing, size: [selectedSize!]});
                                    }}
                                />
                            </ButtonGroup>
                        </Row>

                        <Form onSubmit={createReview}>
                            <Stack direction={"vertical"} gap={3}>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Write a new review</Form.Label>
                                        <Form.Control value={review} onChange={e => setReview(e.target.value)} name={"review"} type={"text"} placeholder={"Review"}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <ButtonGroup>
                                            <Button type={"submit"} variant={"primary"}>
                                                Make review
                                            </Button>
                                        </ButtonGroup>
                                    </Form.Group>
                                </Row>
                            </Stack>
                        </Form>
                        
                        <Stack direction={"vertical"} gap={3}>
                            {reviews.map((review, index) => {
                                return <ReviewItem
                                    key={index}
                                    review={review.text}
                                />
                            })}
                        </Stack>
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