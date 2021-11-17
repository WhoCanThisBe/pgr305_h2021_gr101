import React, {FC, useEffect, useState} from "react";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {IProduct} from "../../Interfaces/IProduct";
import AClothingItem from "./AClothingItem";
import {Col, Row} from "react-bootstrap";

const AClothingList: FC = () => {

    const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

    const [clothes, setClothes] = useState<IProduct[]>([]);

    useEffect(() => {
        setClothes(clothesContext.clothes);
    }, [clothesContext.clothes]);

    const createClothingList = () => {
        if (clothes.length === 0) return <h4>Loading products, please wait...</h4>;
        return clothes.map( (clothing: IProduct, key: number ) => {
            return (
                <Col>
                    <AClothingItem
                        key={key}
                        garment={clothing}
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