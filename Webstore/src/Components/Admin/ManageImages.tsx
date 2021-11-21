import React, {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Col, Form, Row} from "react-bootstrap";
import {IImage} from "../../Interfaces/IImage";
import {ClothesService} from "../../Services/ClothesService";
import ImageItem from "./ImageItem";

const ManageImages: FC = () => {

    const {id}: any = useParams();
    const {fetchProductById} = useContext(ClothesContext) as ClothesContextType;

    const [clothing, setClothing] = useState<IProduct>({
        brandName: "",
        category: "Sko",
        clothingName: "",
        color: "",
        gender: "Male",
        id: undefined,
        images: [],
        size: [],
        stock: 0,
        priceNok: 0,
        amount: 0,
        reviews: []
    });

    const [newImage, setNewImage] = useState<File>();
    const [imagesProduct, setImageProduct] = useState<IImage[]>([]);

    // Set clothing by id on render
    useEffect(() => {
        const _clothing = fetchProductById(id);
        if (_clothing) {
            setClothing(() => _clothing);
            setImageProduct(() => _clothing.images);
        }
    }, [id, fetchProductById]);

    useEffect(() => {
        if (newImage) {
                setImageProduct([...imagesProduct, {
                    name: newImage.name
                }]);
        }
    }, [newImage]);

    const handleNewImage = (event: ChangeEvent<HTMLInputElement>) => {
        let {files} = event.target;
        if (files) {
            setNewImage(files[0]);
        }
    };

    const addImageToProduct = () => {
        setClothing({...clothing, images: imagesProduct});
    };

    // Send updated clothing to the service
    const putNewClothing = () => {
        if (newImage)
            ClothesService.putClothingWithImage(clothing, newImage);
    };

    const deleteClothing = (clothing: IProduct, name: string) => {
        setImageProduct(imagesProduct.filter(item => item.name !== name));
        setTimeout( () => manageDeletion(clothing, name), 100);
    };

    const manageDeletion = (clothes: IProduct, name: string) => {
        setClothing({...clothing, images: imagesProduct});
        const confirm = window.confirm(
            "Do you really want to delete this product?"
        );
        if (confirm) {
            if (name && clothes) {
                ClothesService.putClothing(clothes);
                ClothesService.deleteImage(name);
            }
        }
    };

    const createImageList = () => {
        if (!clothing) return <h4>Loading products, please wait...</h4>

        return imagesProduct.map((imagesProduct, key: number) => {
            return (
                <Col key={key}>
                    <ImageItem image={imagesProduct}/>
                </Col>
            )
        })
    };

    return (
        <article>
            <Form onSubmit={putNewClothing}>
                <Form.Group>
                    <Form.Control disabled={!!newImage} onChange={handleNewImage} type="file" required/>
                </Form.Group>
                <Form.Group>
                    <Button onClick={addImageToProduct} variant="light">
                        Save Image
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Button type={"submit"} variant={"primary"}>
                        Upload
                    </Button>
                </Form.Group>
            </Form>
            <section>
                <Row xs={12} md={6} lg={5} className={"gap-3"}>
                    {createImageList()}
                </Row>
            </section>
        </article>
    )
};

export default ManageImages