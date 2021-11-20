import React, {FC, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import ClothingList from "../Components/Clothing/ClothingList";
import {ClothingFilter} from "../Types/ClothingFilter";

type Props = {};

const Clothing: FC<RouteComponentProps & Props> = ({location}) => {
    const [filter, setFilter] = useState(location.state as ClothingFilter);

    // Effect for updating values in the UI -
    // when the user navigates to a different "clothingType"
    useEffect(() => {
        setFilter(location.state as ClothingFilter);
    }, [location.pathname]);

    return (
        <section>
            <h2>
                <span className={"capitalize"}>{filter.category.name}</span> for{" "}
                <span className={"capitalize"}>{filter.gender}</span>
            </h2>
            <ClothingList filter={filter}/>
        </section>
    );
};

export default Clothing;
