import { Col, Nav, Navbar, Row, Stack } from "react-bootstrap";
import logo from "../Images/logo.svg";
import cartIco from "../Images/shopping_cart.png";
import { Link, useHistory } from "react-router-dom";
import React, {
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { IProduct } from "../Interfaces/IProduct";
import ViewmodeNavigation, { Viewmode } from "./ViewmodeNavigation";
import SearchNavigationItem from "./SearchNavigationItem";

const NavigationBar: FC = () => {
  const history = useHistory();

  // labels and values for "gender-navigation"-button(s)
  const [genders, setGenders] = useState<IProduct["gender"][]>([]);

  // labels and values for "categoryType" of the selected gender
  const [navigationCategories, setNavigationCategories] = useState([""]);

  useEffect(() => {
    setGenders(["Female", "Male", "Unisex"]);
    setNavigationCategories(["clothes", "shoes", "accesories"]);
  }, []);

  // State for the currently selected gender
  const [gender, setGender] = useState<IProduct["gender"]>("Unisex");

  const createGenderNavigationButtons = () => {
    return genders.map((gender, index) => (
      // NB: Need to use some "container" here as the `Nav.Item` -
      // doesn't forward the key to it's underlaying dom-element
      <Fragment key={index}>
        <Nav.Item className={"capitalize"}>
          <Nav.Link
            eventKey={gender}
            as={Link}
            to={`/${gender}-home`}
            onClick={handleGenderNavButtonClick}
          >
            {gender}
          </Nav.Link>
        </Nav.Item>
      </Fragment>
    ));
  };

  const createCategoryNavigationButtons = () => {
    return navigationCategories.map((category, index) => (
      // NB: Need to use some "container" here as the `Nav.Item` -
      // doesn't forward the key to it's underlaying dom-element
      <Fragment key={index}>
        <Nav.Item className={"capitalize"}>
          <Nav.Link eventKey={`${gender}-clothing/${category}`}>
            {category}
          </Nav.Link>
        </Nav.Item>
      </Fragment>
    ));
  };

  // NB: Had to use these types because the "Nav"-component from "React-Bootstrap" -
  // use this typing on its "onSelect"
  const handleSelect = (eventKey: any, evt: SyntheticEvent<unknown, Event>) => {
    // URL: /<gender>-<page>/<category> (e.g.: /Female-clothing/shoes)
    const resourceUrl = eventKey as string;

    // Don't continue if one of the "gender"-options were selected
    // It also prevents a "gender"-option from being added to the url multiple times (e.g: /Male/Male)
    if (genders.includes(eventKey as IProduct["gender"])) return;

    const selectedCategoryType = (
      evt.currentTarget as HTMLAnchorElement
    ).textContent?.toLowerCase();

    // `.textContent` might be undefined, and then we don't want to continue
    if (!selectedCategoryType) return;

    // Found tip about index-signature typing for TypeScript (see README.md, Sources #1)
    // Transforming received categories (clothes, shoes) into expected values (IProduct)
    const productTypesForCategory: { [index: string]: IProduct["category"][] } =
      {
        clothes: ["Sko", "Overdel", "Underdel", "Accesories"],
        shoes: ["Sko"],
        accesories: ["Accesories"],
      };

    // Navigating to "ClothingPage" and passing along some values we can use there
    history.push(`/${resourceUrl}`, {
      gender,
      category: {
        name: selectedCategoryType,
        productTypes: productTypesForCategory[selectedCategoryType],
      },
    });
  };

  // Extract "gender"-value from clicked "gender-navigation"-button and store it in state
  const handleGenderNavButtonClick = (evt: React.MouseEvent) => {
    const selectedGender = evt.currentTarget.textContent;

    if (!selectedGender) return;

    setGender(selectedGender as IProduct["gender"]);
  };

  // State that decides which navbar-items to render
  // The idea is to use this in case we want to render some "admin-specific navigation-items"
  const [viewmodeName, setViewmodeName] =
    useState<Viewmode["name"]>("customer");

  // Counter that shows how many items are in the cart

  const showCartItemCount = () => {
    const cartItems = localStorage.getItem("items");

    if (cartItems) {
      const cartItemsParsed = JSON.parse(cartItems);

      if (cartItemsParsed <= 0) return <></>;

      return <span>{cartItemsParsed.length}</span>;
    }
  };

  return (
    <Navbar bg="myGrey" variant="dark">
      {/* Make the row(s) take up the whole navbar-width ("w-100" => "width: 100%") -
            and center all content on the y-axis
            - Adding row-gap for some spacing between the "navbars"
        */}
      <Stack direction={"vertical"} gap={2}>
        <Row className={"w-100 align-content-center"}>
          {/* Use 12 to make it use all available columns (12/12) */}
          <Col xs={12}>
            <ViewmodeNavigation
              modes={[
                { name: "customer", destination: "/" },
                { name: "admin", destination: "/admin" },
              ]}
              onSelectViewmode={(viewmodeName: Viewmode["name"]) =>
                setViewmodeName(viewmodeName)
              }
            />
          </Col>
        </Row>
        <Row className={"w-100 align-content-center"}>
          {/* Brand and gender-navigation-buttons on "one-half" of the navbar-width (6 out of 12) */}
          <Col xs={6}>
            {/* Place brand and navbuttons horizontally on the same line (horizontal-stack) */}
            <Stack direction={"horizontal"}>
              <Navbar.Brand>
                <Nav.Link
                  as={Link}
                  to={"/"}
                  onClick={() => setViewmodeName("customer")}
                >
                  <img src={logo} width="40px" height="40px" alt={""} />
                  Logo
                </Nav.Link>
              </Navbar.Brand>

              {viewmodeName === "customer" && (
                <Nav
                  variant={"pills"}
                  onSelect={handleSelect}
                  defaultActiveKey={gender}
                >
                  {createGenderNavigationButtons()}
                </Nav>
              )}
            </Stack>
          </Col>
          {/* Navigation "actions" at the right-side of the navbar */}
          <Col xs={6}>
            {/* Wrap a stack around the "Nav" and use "justify-content-end" -
                to put the "Nav" with its content at the end (right-side)
            */}
            {/* NB: To make it align the "Nav"-component with content -
                we need to make the stack "use the same height as its parent" (h-100 => height: 100%)
            */}
            <Stack
              direction={"horizontal"}
              className={"h-100 justify-content-end"}
            >
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/cart"}>
                    <img
                      alt={"Shopping-cart Icon"}
                      src={cartIco}
                      width={"40"}
                    />
                    {showCartItemCount()}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Stack>
          </Col>
        </Row>
        <Row className={"w-100 align-content-center"}>
          <Col xs={6}>
            {viewmodeName === "customer" && (
              <Nav onSelect={handleSelect} style={{ paddingLeft: "9rem" }}>
                {createCategoryNavigationButtons()}
              </Nav>
            )}
          </Col>
          <Col xs={6}>
            <SearchNavigationItem />
          </Col>
        </Row>
      </Stack>
    </Navbar>
  );
};

export default NavigationBar;
