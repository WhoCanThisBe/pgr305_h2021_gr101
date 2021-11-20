import React, { FC } from "react";
import {Card} from "react-bootstrap";

type Props = {
    review?: string;
};

const ReviewItem: FC<Props> = ({review}) => {
    return (
        <Card>
            <Card.Body>{review}</Card.Body>
        </Card>
    );
};

export default ReviewItem;
