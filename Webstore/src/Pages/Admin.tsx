import {FC} from "react";
import CreateClothingForm from "../Components/Admin/CreateClothingForm";

const Admin: FC  = () => {
    return(
        <>
            <h1>Add New Clothes</h1>
            <CreateClothingForm/>
        </>
    )
};

export default Admin;
