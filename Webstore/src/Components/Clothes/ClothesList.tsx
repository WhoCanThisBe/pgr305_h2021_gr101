import React, {FC, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {IProduct} from "../../Interfaces/IProduct";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {ClothesContextType} from "../../types/ClothesContextType";
import ClothesItem from "./ClothesItem";

type Props = {
    filter?: string;
};

const ClothesList: FC<Props> = ({filter}) => {
    const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

    const [clothes, setClothes] = useState<IProduct[]>([]);

    useEffect(() => {
        // Set all clothes if we haven|t received any filter (e.g: male, female)
        if (!filter) return setClothes(clothesContext.clothes);

        setClothes(
            // TODO: Switch out "gender"-key here with something more generic later
            clothesContext.fetchProductsByGender(filter as IProduct["gender"])
        );
    }, [filter]);

    const createClothesList = () => {
        return clothes.map((garment: IProduct, index: number) => {
            return (
                <Col key={index}>
                    <ClothesItem garment={garment} />
                </Col>
            );
        });
    };

    return (
        <Row xl={2} className={"g-4"}>
            {createClothesList()}
        </Row>
    );
};

export default ClothesList;
