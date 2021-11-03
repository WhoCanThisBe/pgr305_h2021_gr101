import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { ClothesContextType } from "../../types/ClothesContextType";
import { ClothesContext } from "../../Contexts/ClothesContext";
import { IProduct } from "../../Interfaces/IProduct";
import ClothingItem from "./ClothingItem";

export type ClothingFilter = {
  gender: IProduct["gender"];
  categories: IProduct["categoryType"][];
};

type Props = {
  filter: ClothingFilter;
};

const ClothingList: FC<Props> = ({ filter }) => {
  const clothingContext = React.useContext(
    ClothesContext
  ) as ClothesContextType;

  const createClothingList = () => {
    const clothingForGender = clothingContext.fetchProductsByGender(
      filter.gender
    );

    const clothingForCategories = clothingForGender.filter((clothing) =>
      filter.categories?.includes(clothing.categoryType)
    );

    return clothingForCategories.map((clothing, index) => (
      <Col key={index}>
        <ClothingItem clothing={clothing} />
      </Col>
    ));
  };

  return <Row>{createClothingList()}</Row>;
};

export default ClothingList;
