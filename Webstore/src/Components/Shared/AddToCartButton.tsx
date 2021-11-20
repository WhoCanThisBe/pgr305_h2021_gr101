import React, {FC, MouseEventHandler} from "react";
import {Button} from "react-bootstrap";

type Props = {
    isDisabled: boolean;
    onClick: MouseEventHandler;
};

export const AddToCartButton: FC<Props> = ({isDisabled, onClick}) => {
    return (
        <Button variant={"primary"} disabled={isDisabled} onClick={onClick}>
            Add to cart
        </Button>
    );
};
