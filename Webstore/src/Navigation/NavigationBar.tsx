import { Nav, Navbar, Stack } from "react-bootstrap";
import logo from "../Images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { IProduct } from "../Interfaces/IProduct";

const NavigationBar = () => {
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
        clothes: ["Sko", "Jakke", "Genser", "Bukse", "Accesories"],
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
              {createGenderNavigationButtons()}
            </Stack>
            <Stack direction={"horizontal"}>
              {createCategoryNavigationButtons()}
            </Stack>
          </Stack>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to={"/cart"}>
            Cart
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
