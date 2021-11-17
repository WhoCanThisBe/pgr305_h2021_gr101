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
  onGenderChange: (eventKey: string | null, e: SyntheticEvent<unknown>) => void;
  gender: string;
};

export const GenderDropdown: FC<Props> = ({ onGenderChange, gender }) => {
  const [genders, setGenders] = useState<IProduct["gender"][]>([]);

  useEffect(() => {
    setGenders(["Male", "Female", "Unisex"]);
  }, []);

  return (
    <DropdownButton
      onSelect={onGenderChange}
      title={gender ? `Selected gender: ${gender}` : "Select a gender"}
      as={ButtonGroup}
    >
      {genders.map((gender, index) => (
        <Fragment key={index}>
          <Dropdown.Item eventKey={gender}>{gender}</Dropdown.Item>
        </Fragment>
      ))}
    </DropdownButton>
  );
};
