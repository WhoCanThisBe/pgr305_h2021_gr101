import {FC} from "react";
import CreateClothingForm from "../Components/Admin/CreateClothingForm";
import AClothingList from "../Components/Admin/AClothingList";
import {RouteComponentProps} from "react-router";

type Props = {};

const Admin: FC<Props & RouteComponentProps>  = () => {
    return(
        <article>
            <h1>Add New Clothes</h1>
            <CreateClothingForm/>
            <h1>Update Clothing</h1>
            <AClothingList/>
        </article>
    )
};

export default Admin;
