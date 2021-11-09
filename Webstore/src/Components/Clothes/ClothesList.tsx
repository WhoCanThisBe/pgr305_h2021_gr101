import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IProduct } from "../../Interfaces/IProduct";
import { ClothesContext } from "../../Contexts/ClothesContext";
import { ClothesContextType } from "../../Types/ClothesContextType";
import ClothesItem from "./ClothesItem";

type Props = {
  filter?: string;
};

const ClothesList: FC<Props> = ({ filter }) => {
  const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

  const [clothes, setClothes] = useState<IProduct[]>([]);

  // Effect that fetches clothes on "initial-mount" and on navigation to a "<gender>-home"-page

  useEffect(() => {
    // Set all clothes if we haven't received any filter (e.g: male, female)
    if (!filter) return setClothes(clothesContext.clothes);

    setClothes(
      // TODO: Switch out "gender"-key here with something more generic later
      clothesContext.fetchProductsByGender(filter as IProduct["gender"])
    );
  }, [clothesContext.clothes]);
 

  const createClothesList = () => {
    if (clothes.length === 0) return <h4>Loading products, please wait...</h4>;
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
