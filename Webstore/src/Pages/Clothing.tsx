import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import ClothingList, {
  ClothingFilter,
} from "../Components/Clothing/ClothingList";

type Props = {};

const Clothing: FC<RouteComponentProps & Props> = ({ location }) => {
  const [filter, setFilter] = useState(location.state as ClothingFilter);

  // Effect for updating values in the UI -
  // when the user navigates to a different "clothingType"
  useEffect(() => {
    setFilter(location.state as ClothingFilter);
  }, [location.pathname]);

  return (
    <section>
      <h2>Clothing for {filter.gender}</h2>
      <ClothingList filter={filter} />
    </section>
  );
};

export default Clothing;
