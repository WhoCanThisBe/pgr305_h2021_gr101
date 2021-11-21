import {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Nav} from "react-bootstrap";

type Props = {
    garment: IProduct;
    manageDeletion: (id: string | undefined) => void;
};

const AClothingItem: FC<Props> = ({garment, manageDeletion}) => {
    return (
        <article>
            <h2>{garment.clothingName}</h2>
            <h2>Stock: {garment.stock}</h2>
            <Nav variant={"pills"} activeKey="1">
                <Nav.Item>
                    <Button variant={"primary"} href={`/update-clothing/${garment.id}`}>
                        Edit
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button variant={"success"} href={`/manage-images/${garment.id}`}>
                        Images
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button onClick={() => manageDeletion(garment.id)} variant={"danger"}>
                        Delete
                    </Button>
                </Nav.Item>
            </Nav>
        </article>
    )
};

export default AClothingItem;