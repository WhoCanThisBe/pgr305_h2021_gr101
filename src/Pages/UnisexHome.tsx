import { FC } from "react";
import ClothesList from "../components/Clothes/ClothesList";

type Props = {};

const UnisexHome: FC<Props> = () => {
  return (
    <>
      <h2>Unisex</h2>
      <ClothesList filter={"unisex"} />
    </>
  );
};

export default UnisexHome;
