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

    // `.textContent` might be undefined, and then we don't want to continue
    if (!selectedCategoryType) return;

    // URL: /<gender>-<page>/<category> (e.g.: /female-clothing/shoes)
    const selectedClothingUrl = `${genderLinkUrls[genderEventKey]}/${selectedCategoryType}`;

    // Extract out the "gender"-part of the URL (see above)
    const selectedGender = genderLinkUrls[genderEventKey]
      .split("-")[0]
      .replace("/", "");

    // Found tip about index-signature typing for TypeScript here: https://basarat.gitbook.io/typescript/type-system/index-signatures
    // Also added it in "Sources" in README.md
    // Transforming received categories (clothes, shoes) into expected values (IProduct)
    const categories: { [index: string]: string[] } = {
      clothes: ["sko", "jakke", "genser", "bukse"],
      shoes: ["sko"],
    };

    // Navigating to "ClothingPage" and passing along some values we can use there
    history.push(selectedClothingUrl, {
      gender: selectedGender,
      categories: categories[selectedCategoryType],
    });
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
              <NavDropdown.Item eventKey={"2.2"}>Shoes</NavDropdown.Item>
              <NavDropdown.Item eventKey={"2.3"}>Accesories</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
          <Nav.Link eventKey={"3"} as={Link} to={"/unisex-home"}>
            Unisex
            <NavDropdown title="">
              <NavDropdown.Item eventKey={"3.1"}>Clothes</NavDropdown.Item>
              <NavDropdown.Item eventKey={"3.2"}>Shoes</NavDropdown.Item>
              <NavDropdown.Item eventKey={"3.3"}>Accesories</NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
