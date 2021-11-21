import React, {
    FC,
    Fragment,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {ISize} from "../../Interfaces/ISize";

type Props = {
    onSizeChange: (size: ISize) => void;
    clothingSizes: ISize[];
};

export const SizeDropdown: FC<Props> = ({onSizeChange, clothingSizes}) => {
    const [selectedSize, setSelectedSize] = useState<ISize>();

    function onChange(eventKey: string | null) {
        const found = clothingSizes.find(cloth => cloth.name === eventKey);
        if (found) {
            setSelectedSize(found);
            onSizeChange(found);
        }
    }

    return (
        <DropdownButton
            onSelect={onChange}
            title={selectedSize ? `Selected size: ${selectedSize.name}` : "Select a size"}
            as={ButtonGroup}
        >
            {clothingSizes && clothingSizes.map((size, index) => (
                <Fragment key={index}>
                    <Dropdown.Item eventKey={size.name}>{size.name}: {size.stock}</Dropdown.Item>
                </Fragment>
            ))}
        </DropdownButton>
    );
};
