import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IProduct } from "../../Interfaces/IProduct";
import ClothesItem from "./ClothesItem";
import { ClothesContextType } from "../../Types/ClothesContextType";
import { ClothesContext } from "../../Contexts/ClothesContext";
import { useHistory } from "react-router-dom";

type Props = {
  filter?: string;
};

const ClothesList: FC<Props> = ({ filter }) => {
  const clothesContext = React.useContext(ClothesContext) as ClothesContextType;

  const [clothes, setClothes] = useState<IProduct[]>([]);

  const history = useHistory();

  const handleNavigationToDetails = (product: IProduct) => {
    history.push(`/${product.brandName}-${product.clothingName}`, {
      id: product.id,
    });
  };

  // Effect that fetches clothes on "initial-mount" and on navigation to a "<gender>-home"-page
  useEffect(() => {
    // Set all clothes if we haven't received any filter (e.g: male, female)
    if (!filter) return setClothes(clothesContext.clothes);

    setClothes(
      clothesContext.fetchProductsByGender(filter as IProduct["gender"])
    );
  }, [clothesContext.clothes]);

  const createClothesList = () => {
    if (clothes.length === 0) return <h4>Loading products, please wait...</h4>;

    return clothes.map((garment: IProduct, index: number) => {
      return (
        <Col key={index}>
          <ClothesItem
            garment={garment}
            onNavigationToDetails={(product: IProduct) =>
              handleNavigationToDetails(product)
            }
          />
        </Col>
      );
    });
  };

  return (
    <Row xs={12} md={6} lg={5} className={"gap-3"}>
      {createClothesList()}
    </Row>
  );
};

export default ClothesList;
