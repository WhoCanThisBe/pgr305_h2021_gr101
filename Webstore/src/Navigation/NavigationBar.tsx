import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../Images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { SyntheticEvent } from "react";

const NavigationBar = () => {
  const history = useHistory();

  // NB: Had to use these types because the "Nav"-component from "React-Bootstrap" -
  // use this typing on it's "onSelect"
  const handleSelect = (eventKey: any, evt: SyntheticEvent<unknown, Event>) => {
    // Don't continue if none of the dropdown-items are selected
    if (!(eventKey as string).includes(".")) return;

    const genderLinkUrls = [
      "/female-clothing",
      "/male-clothing",
      "/unisex-clothing",
    ];

    // Stop the event from "bubbling up" to it's Nav.Link -
    // (avoid getting the "Nav.Link" eventKey after getting the "NavDropdown.Item" eventKey)
    evt.stopPropagation();

    const genderEventKey = parseInt(eventKey, 10) - 1;

    const selectedCategoryType = (
      evt.currentTarget as HTMLAnchorElement
    ).textContent?.toLowerCase();

    const selectedClothingUrl = `${genderLinkUrls[genderEventKey]}/${selectedCategoryType}`;

    history.push(selectedClothingUrl);
  };

  return (
    <div>
      <Navbar bg="myGrey menuOpt" variant="dark">
        <Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            <img src={logo} width="40px" height="40px" />
            Logo
          </Nav.Link>
        </Navbar.Brand>
        <Nav onSelect={handleSelect}>
          <Nav.Link eventKey={"1"} as={Link} to={"/female-home"}>
            Female
            <NavDropdown title="">
              <NavDropdown.Item eventKey={"1.1"}>Clothes</NavDropdown.Item>
              <NavDropdown.Item eventKey={"1.2"}>Shoes</NavDropdown.Item>
              <NavDropdown.Item eventKey={"1.3"}>Accesories</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
          <Nav.Link eventKey={"2"} as={Link} to={"/male-home"}>
            Male
            <NavDropdown title="">
              <NavDropdown.Item eventKey={"2.1"}>Clothes</NavDropdown.Item>
              <NavDropdown.Item>Shoes</NavDropdown.Item>
              <NavDropdown.Item>Accesories</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
          <Nav.Link eventKey={"3"} as={Link} to={"/unisex-home"}>
            Unisex
            <NavDropdown title="">
              <NavDropdown.Item eventKey={"3.1"}>Clothes</NavDropdown.Item>
              <NavDropdown.Item>Shoes</NavDropdown.Item>
              <NavDropdown.Item>Accesories</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
