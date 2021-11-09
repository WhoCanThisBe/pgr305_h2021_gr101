import ClothesList from "../Components/Clothes/ClothesList";
import {FC} from "react";

type Props = {};

const MaleHome: FC<Props> = () => {
    return (
        <>
            <h1>Male</h1>
            <ClothesList filter={"Male"}/>
        </>
    );
};

export default MaleHome;
