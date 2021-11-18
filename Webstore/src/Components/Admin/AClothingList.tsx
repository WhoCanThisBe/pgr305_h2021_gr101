import React, {FC, useEffect, useState} from "react";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {IProduct} from "../../Interfaces/IProduct";
import AClothingItem from "./AClothingItem";
import {Col, Row} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";

const AClothingList: FC = () => {

    const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

    const [clothes, setClothes] = useState<IProduct[]>([]);

    useEffect(() => {
        setClothes(clothesContext.clothes);
    }, [clothesContext.clothes]);

    const manageDeletion = (id: string | undefined) => {
        const confirm = window.confirm(
            "Do you really want to delete this product?"
        );
        if(confirm) {
            if(id) {
                ClothesService.deleteClothing(id);
                setClothes(clothes.filter(clothing => clothing.id !== id));
            }
        }
    };

    const createClothingList = () => {
        if (clothes.length === 0) return <h4>Loading products, please wait...</h4>;
        return clothes.map( (clothing: IProduct, key: number ) => {
            return (
                <Col>
                    <AClothingItem
                        key={key}
                        garment={clothing}
                        manageDeletion={manageDeletion}
                    />
                </Col>
            )
        })
    };

    return(
        <Row>
            { createClothingList() }
        </Row>
    )
};

export default AClothingList;