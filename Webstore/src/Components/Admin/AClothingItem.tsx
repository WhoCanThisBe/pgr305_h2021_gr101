import {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Nav} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";

type Props = {
    garment: IProduct;
};

const AClothingItem: FC<Props> = ({garment}) => {

        const manageDeletion = (id: string | undefined) => {
            const confirm = window.confirm(
              "Do you really want to delete this product?"
            );
            if(confirm) {
                if(id) {
                    ClothesService.deleteClothing(id);
                    // TODO Find a more elegant solution to reload the list
                    window.location.reload();
                }
            }
        };

        return (
            <article>
                <h2>{garment.clothingName}</h2>
                <h2>Stock: {garment.stock}</h2>
                <Nav variant={"pills"} activeKey="1">
                    <Nav.Item>
                        <Nav.Link eventKey="1" href={`/update-clothing/${garment.id}`}>
                            Update
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button onClick={ () => manageDeletion(garment.id)} variant={"danger"}>
                            Delete
                        </Button>
                    </Nav.Item>
                </Nav>
            </article>
        )
};

export default AClothingItem;