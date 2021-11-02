import { FC } from "react";
import ClothesList from "../Components/Clothes/ClothesList";

const FemaleHome: FC = () => {
  return (
    <>
      <h1>Female</h1>
      <ClothesList filter={"female"} />
    </>
  );
};

export default FemaleHome;
