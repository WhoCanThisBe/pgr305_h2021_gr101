import React, {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {ClothesContext} from "../../Contexts/ClothesContext";
import {IProduct} from "../../Interfaces/IProduct";
import ClothingItem from "./ClothingItem";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {useHistory} from "react-router-dom";
import {ClothingFilter} from "../../Types/ClothingFilter";
import NoClothingView from "../Shared/NoClothingView";

type Props = {
    filter: ClothingFilter;
};

const ClothingList: FC<Props> = ({filter}) => {
    const clothingContext = React.useContext(
        ClothesContext
    ) as ClothesContextType;

    const history = useHistory();

    const handleNavigationToDetails = (product: IProduct) => {
        history.push(`/clothing/${product.id}`);
    };

    const createClothingList = () => {
        const clothingForGender = clothingContext.fetchProductsByGender(
            filter.gender
        );

        // Extract clothing for the selected categories, for the selected gender
        const clothingForCategories = clothingForGender.filter((clothing) =>
            filter.category.productTypes.includes(clothing.category)
        );

        //Check if there is something in there
        if (clothingForCategories.length === 0) {
            return (
                <NoClothingView/>

            )
        }

        return clothingForCategories.map((clothing, index) => (
            <Col key={index}>
                <ClothingItem
                    clothing={clothing}
                    onNavigationToDetails={(product) =>
                        handleNavigationToDetails(product)
                    }
                />
            </Col>
        ));
    };


    return (
        <Row sm={2} md={2} lg={4} className={"gap-3"}>
            {createClothingList()}
        </Row>
    );
};

export default ClothingList;
