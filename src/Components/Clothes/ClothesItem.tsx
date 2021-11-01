import React, {FC} from 'react';
import {Card} from "react-bootstrap";

const ClothesItem: FC = () => {
    return (
        <Card>
            <Card.Img variant={"top"} src={require(`${process.env.PUBLIC_URL}/logo512.png`)} />
            <Card.Body>
                <Card.Text>Brandname here?</Card.Text>
                <Card.Title>Garmentname here</Card.Title>
                <Card.Text>Brandname here?</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ClothesItem;