import {FC} from "react";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Nav, Table} from "react-bootstrap";

type Props = {
    garment: IProduct;
    manageDeletion: (id: string | undefined) => void;
};

const AClothingItem: FC<Props> = ({garment, manageDeletion}) => {
    return (

        <Table>
            <thead>
            <tr>
                <th>Brand Name</th>
                <th>Clothing Name</th>
                <th>Color</th>
                <th>Gender</th>
                <th>Price</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{garment.brandName}</td>
                <td>{garment.clothingName}</td>
                <td>{garment.color}</td>
                <td>{garment.gender}</td>
                <td>{garment.priceNok}</td>
                <td>
                    <Nav>
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
                </td>
            </tr>
            </tbody>

        </Table>
    )

};

export default AClothingItem;