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
                    <Nav variant={"pills"} activeKey="1" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="1" href={`/update-clothing/${garment.id}`}>
                                Update
                            </Nav.Link>
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