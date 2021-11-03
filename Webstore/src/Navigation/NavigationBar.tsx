import { Nav, Navbar, Stack } from "react-bootstrap";
import logo from "../Images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

const NavigationBar = () => {
  const history = useHistory();

  const [gender, setGender] = useState("unisex");

  // NB: Had to use these types because the "Nav"-component from "React-Bootstrap" -
  // use this typing on it's "onSelect"
  const handleSelect = (eventKey: any, evt: SyntheticEvent<unknown, Event>) => {
    const genders = ["female", "male", "unisex"];

    const resourceUrl = eventKey as string;

    // Don't continue if one of the "gender"-options were selected
    if (genders.includes(resourceUrl)) return;

    // Stop the event from "bubbling up" to the "gender"-Nav.Link(s)
    // (avoid getting the "gender Nav.Link"-eventKey after getting the "categoryType"-eventKey)
    evt.stopPropagation();

    const selectedCategoryType = (
      evt.currentTarget as HTMLAnchorElement
    ).textContent?.toLowerCase();

    // `.textContent` might be undefined, and then we don't want to continue
    if (!selectedCategoryType) return;

    // Don't add the same "selectedCategoryType" multiple times...
    if (resourceUrl.includes(selectedCategoryType)) return;

    // URL: /<gender>-<page>/<category> (e.g.: /female-clothing/shoes)
    const selectedClothingUrl = `/${resourceUrl}/${selectedCategoryType}`;

    // Found tip about index-signature typing for TypeScript here: https://basarat.gitbook.io/typescript/type-system/index-signatures
    // Also added it in "Sources" in README.md
    // Transforming received categories (clothes, shoes) into expected values (IProduct)
    const categories: { [index: string]: string[] } = {
      clothes: ["sko", "jakke", "genser", "bukse"],
      shoes: ["sko"],
    };

    // Navigating to "ClothingPage" and passing along some values we can use there
    history.push(selectedClothingUrl, {
      gender,
      categories: categories[selectedCategoryType],
    });
  };

  return (
    <div>
      <Navbar bg="myGrey menuOpt" variant="dark">
        <Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            <img src={logo} width="40px" height="40px" alt={""} />
            Logo
          </Nav.Link>
        </Navbar.Brand>
        <Nav onSelect={handleSelect} defaultActiveKey={gender}>
          <Stack direction={"vertical"}>
            <Stack direction={"horizontal"}>
              <Nav.Item>
                <Nav.Link
                  eventKey={"female"}
                  as={Link}
                  to={"/female-home"}
                  onClick={(e) => {
                    const selectedGender =
                      e.currentTarget.textContent?.toLowerCase();

                    setGender(selectedGender ?? "");
                  }}
                >
                  Female
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={"male"}
                  as={Link}
                  to={"/male-home"}
                  onClick={(e) => {
                    const selectedGender =
                      e.currentTarget.textContent?.toLowerCase();

                    setGender(selectedGender ?? "");
                  }}
                >
                  Male
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={"unisex"}
                  as={Link}
                  to={"/unisex-home"}
                  onClick={(e) => {
                    const selectedGender =
                      e.currentTarget.textContent?.toLowerCase();

                    setGender(selectedGender ?? "");
                  }}
                >
                  Unisex
                </Nav.Link>
              </Nav.Item>
            </Stack>
            <Stack direction={"horizontal"}>
              <Nav.Item>
                <Nav.Link eventKey={`${gender}-clothing`}>Clothes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={`${gender}-clothing`}>Shoes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={`${gender}-clothing`}>Accesories</Nav.Link>
              </Nav.Item>
            </Stack>
          </Stack>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
