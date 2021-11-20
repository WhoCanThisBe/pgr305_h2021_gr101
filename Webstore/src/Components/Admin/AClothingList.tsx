import React, {FC, useEffect, useState} from "react";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {IProduct} from "../../Interfaces/IProduct";
import AClothingItem from "./AClothingItem";
import {Col, ListGroup, Row} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";

const AClothingList: FC = () => {

    const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

    const [clothes, setClothes] = useState<IProduct[]>([]);

    useEffect(() => {
        updateList();
    }, [clothesContext.clothes]);

    const updateList = () => {
        setClothes(clothesContext.clothes)
    };

    const manageDeletion = (id: string | undefined) => {
        const confirm = window.confirm(
            "Do you really want to delete this product?"
        );
        if (confirm) {
            if (id) {
                ClothesService.deleteClothing(id);
                setClothes(clothes.filter(clothing => clothing.id !== id));
            }
        }
    };

    const createClothingList = () => {
        if (clothes.length === 0) return <h4>Loading products, please wait...</h4>;
        return clothes.map((clothing: IProduct, key: number) => {
            return (
                <ListGroup.Item key={key}>
                    <AClothingItem
                        garment={clothing}
                        manageDeletion={manageDeletion}
                    />
                </ListGroup.Item>
            )
        })
    };

    return (
        <Row>
            {createClothingList()}
        </Row>
    )
};

export default AClothingList;