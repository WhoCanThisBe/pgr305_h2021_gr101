import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IProduct } from "../Interfaces/IProduct";
import { ClothesContext } from "../Contexts/ClothesContext";
import { ClothesContextType } from "../Types/ClothesContextType";
import ClothingItem from "../Components/Clothing/ClothingItem";
import { Col, Image, Row, Stack } from "react-bootstrap";
import NavigationService from "../Services/NavigationService";

const Search: FC = () => {
  const { clothes, fetchProductsByGender } = useContext(
    ClothesContext
  ) as ClothesContextType;

  //const location = useLocation();

  const history = useHistory();

  const [query, setQuery] = useState<URLSearchParams>(
    new URLSearchParams(history.location.search.toLowerCase())
  );

  // Effect that updates query on search (to render list of new results)
  useEffect(() => {
    setQuery(new URLSearchParams(history.location.search.toLowerCase()));
  }, [history.location.search]);

  useEffect(() => {
    if (!query) return;
    prepareResultList();
  }, [query]);

  const [resultList, setResultList] = useState<IProduct[]>();

  const prepareResultList = () => {
    const categories: IProduct["category"][] = [
      "Sko",
      "Overdel",
      "Underdel",
      "Accesories",
    ];

    const genders: IProduct["gender"][] = ["Female", "Male", "Unisex"];

    const queryStringParts = query.get("q")?.split(" ");

    // Don't continue if we didn't receive any "valid query-string"
    if (!queryStringParts) return setResultList([]);

    // Get the first found possible gender-value in the "query-string"
    const possibleFirstGender = queryStringParts[0];

    const foundGender = genders.find((gender) =>
      possibleFirstGender?.includes(gender.toLowerCase())
    );

    // Check for categories
    const foundCategories = categories.filter((category) =>
      queryStringParts.includes(category.toLowerCase())
    );

    // Use unfiltered clothes if we didn't find any genders in the "query-string"
    let productList = foundGender
      ? fetchProductsByGender(foundGender)
      : clothes;

    // Prepare "a new list" of products that match given categories, or use the existing list
    productList =
      foundCategories.length > 0
        ? productList.filter((p) => foundCategories.includes(p.category))
        : productList;

    // Extract brandName(s) from "query-string"
    const foundBrandNames = productList.filter((p) =>
      queryStringParts?.includes(p.brandName.toLowerCase())
    );

    productList = foundBrandNames.length > 0 ? foundBrandNames : productList;

    // We assume that the clothingName should be at the end of the "query-string"
    const possibleClothingName =
      queryStringParts?.[queryStringParts.length - 1];

    const foundClothingNames = productList.filter((p) => {
      return p.clothingName.toLowerCase().includes(possibleClothingName!);
    });

    // set the resultList to be empty if we received more than one "query-string"-part (e.g: "male bob") -
    // but found no matches in the other "filters" (categories, brandName, etc.)
    if (
      (queryStringParts?.length ?? 0) > 1 &&
      foundCategories.length === 0 &&
      foundBrandNames.length === 0 &&
      foundClothingNames.length === 0
    ) {
      return setResultList([]);
    }

    // Last "filtering" of the productList...
    productList =
      foundClothingNames.length > 0 ? foundClothingNames : productList;

    setResultList(productList);
  };

  const renderResultList = () => {
    if (!resultList) {
      return <p>Loading list of results, please wait...</p>;
    } else if (resultList.length === 0) {
      return (
        <>
          <Stack direction={"vertical"}>
            <Col>
              <p className={"capitalize"}>
                You searched for: <strong>{query.get("q")}</strong>
              </p>
            </Col>
            <Col>
              <p>
                <strong>{resultList.length} results</strong> were found, try
                again with a different search term
              </p>
            </Col>
          </Stack>
        </>
      );
    }

    // Make a temp-list for testing etc?
    const handleNavigationToDetails = (product: IProduct) => {
      history.push(`/${product.brandName}-${product.clothingName}`, {
        id: product.id,
      });
    };

    return resultList.map((product: IProduct, index: number) => (
      <Col key={index}>
        <ClothingItem
          clothing={product}
          onNavigationToDetails={handleNavigationToDetails}
        />
      </Col>
    ));
  };

  return (
    <>
      <header className={"my-3 d-flex flex-column gap-3"}>
        <h2>Search page</h2>
        <h3>Search results</h3>
      </header>

      <Row>
        <Col xs={2} md={2} lg={2}>
          <Stack direction={"horizontal"} gap={3}>
            <Image
              src={require("../Images/left-arrow.png").default}
              height={32}
              width={32}
              onClick={() => {
                const { path, state } = NavigationService.fetchNavInfo();

                history.push(`${path}`, state);
              }}
            />
            <h2 className={"capitalize"}>"{query.get("q")}"</h2>
          </Stack>
        </Col>
        <Col xs={10} md={6} lg={10}>
          <Row>{renderResultList()}</Row>
        </Col>
      </Row>

      <div>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/roundicons"
          title="Roundicons"
        >
          Roundicons
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  );
};

export default Search;
