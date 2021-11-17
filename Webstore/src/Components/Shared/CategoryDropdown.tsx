import React, {
    FC,
    Fragment,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

type Props = {
    onCategoryChange: (eventKey: string | null, e: SyntheticEvent<unknown>) => void;
    category: string;
};

export const CategoryDropdown: FC<Props> = ({ onCategoryChange, category }) => {
    const [categories, setCategories] = useState([""]);

    useEffect(() => {
        setCategories(["Sko", "Jakke", "Genser", "Bukse", "Accesories"]);
    }, []);

    return (
        <DropdownButton
            onSelect={onCategoryChange}
            title={category ? `Selected category: ${category}` : "Select a category"}
            as={ButtonGroup}
        >
            {categories.map((category, index) => (
                <Fragment key={index}>
                    <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
                </Fragment>
            ))}
        </DropdownButton>
    );
};