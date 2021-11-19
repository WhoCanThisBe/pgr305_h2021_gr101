import React, {
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { IProduct } from "../../Interfaces/IProduct";

type Props = {
  onCategoryChange: (
    eventKey: string | null,
    e: SyntheticEvent<unknown>
  ) => void;
  category: string;
};

export const CategoryDropdown: FC<Props> = ({ onCategoryChange, category }) => {
  const [categories, setCategories] = useState<IProduct["category"][]>([]);

  useEffect(() => {
    setCategories(["Sko", "Overdel", "Bukse", "Accesories"]);
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
