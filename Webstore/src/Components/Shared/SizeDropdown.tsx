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
  onSizeChange: (eventKey: string | null, e: SyntheticEvent<unknown>) => void;
  size: IProduct["size"];
};

export const SizeDropdown: FC<Props> = ({ onSizeChange, size }) => {
  const [sizes, setSizes] = useState<IProduct["size"][]>([]);

  useEffect(() => {
    setSizes(["Small", "Medium", "Large"]);
  }, []);

  return (
    <DropdownButton
      onSelect={onSizeChange}
      title={size ? `Selected size: ${size}` : "Select a size"}
      as={ButtonGroup}
    >
      {sizes.map((size, index) => (
        <Fragment key={index}>
          <Dropdown.Item eventKey={size}>{size}</Dropdown.Item>
        </Fragment>
      ))}
    </DropdownButton>
  );
};
