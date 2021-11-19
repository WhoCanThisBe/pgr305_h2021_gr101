import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ClothingList from "../Components/Clothing/ClothingList";
import { IProduct } from "../Interfaces/IProduct";

const Search: FC = () => {
  const location = useLocation<{ referer: string }>();

  const [query, setQuery] = useState<URLSearchParams>(
    new URLSearchParams(location.search)
  );

  // Effect that updates query on search (to render list of new results)
  useEffect(() => {
    setQuery(new URLSearchParams(location.search));
  }, [location.search]);

  const renderResultList = () => {
    const categories: IProduct["category"][] = [
      "Sko",
      "Jakke",
      "Genser",
      "Bukse",
      "Accesories",
    ];

    const genders: IProduct["gender"][] = ["Female", "Male", "Unisex"];

    // Get the first found possible gender-value in the "query-string"
    const foundGender =
      genders.find((gender) =>
        query.get("q")?.includes(gender.toLowerCase())
      ) ?? "Unisex";

    // Check for categories
    const foundCategories = categories.filter((category) =>
      query.get("q")?.includes(category.toLowerCase())
    );

    return (
      <ClothingList
        filter={{
          gender: foundGender,
          category: {
            name: foundGender,
            // "Hand over" all categories if none could be found (see "check"-above)
            productTypes:
              foundCategories.length > 0 ? foundCategories : categories,
          },
        }}
      />
    );
  };

  return (
    <>
      <br />
      <h2>Search page</h2>
      <br />
      <h3>Search results</h3>
      {renderResultList()}
    </>
  );
};

export default Search;
