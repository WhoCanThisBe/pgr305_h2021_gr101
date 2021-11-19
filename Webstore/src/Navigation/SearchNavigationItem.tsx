import { FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CloseButton,
  FloatingLabel,
  Form,
  InputGroup,
  Nav,
} from "react-bootstrap";

const SearchNavigationItem: FC = () => {
  // Ref. for checking when the "Enter"-key has been clicked etc.
  const searchInput = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const [referer, setReferer] = useState(
    history.location.pathname.split("search")[0]
  );

  // Function that check when someone has typed "Enter" into the search-field and extracts the query
  const handleSubmitSearch = (evt: KeyboardEvent) => {
    const key = evt.code;

    // Don't continue if the "Enter"-key wasnt pressed
    if (!/enter/i.test(key)) return;

    const enteredQuery = searchInput?.current?.value;

    // Don't continue if the user entered nothing (empty string)
    if (!enteredQuery) return;

    // Give the "search"-page some info on where the search originated from -
    // (e.g.: search performed from "/Male-home")
    // referer can be used to "redirect back when a search is canceled" etc
    history.push(`/search?q=${enteredQuery}`, {
      referer,
    });
  };

  useEffect(() => {
    if (!searchInput.current) return;

    searchInput.current.addEventListener("keyup", handleSubmitSearch);

    // Remove eventlistener as clean-up (remove any old listeners before adding new ones)
    // See "README.md, Sources, #3"
    return () =>
      searchInput?.current?.removeEventListener("keyup", handleSubmitSearch);
  }, [searchInput.current]);

  return (
    <Nav>
      <Nav.Item>
        <InputGroup>
          <InputGroup.Text>Search</InputGroup.Text>
          <FloatingLabel label={"Type in a search term"}>
            <Form.Control
              ref={searchInput}
              type={"text"}
              placeholder={"Type in something to search for"}
              min={3}
            />
          </FloatingLabel>
          <CloseButton
            style={{
              height: "2.9rem",
              position: "absolute",
              right: "2px",
            }}
            onClick={() => {
              /*
                TODO: Find a solution for the following situation:
                - Do a search (e.g: type in "male") and clear the field (with the "X"-symbol).
                - Navigate to "Female" => "Clothes".
                - Clear the input twice and crash...
              */

              // Prepare to send the customer back
              setReferer(history.location.pathname.split("search")[0]);

              // Clear search-input
              if (searchInput?.current?.value) {
                searchInput.current.value = "";
              }

              history.push(`${referer}`);
            }}
          />
        </InputGroup>
      </Nav.Item>
    </Nav>
  );
};

export default SearchNavigationItem;
