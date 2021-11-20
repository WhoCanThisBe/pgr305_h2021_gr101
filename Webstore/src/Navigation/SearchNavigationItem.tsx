import {FC, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import {
    CloseButton,
    FloatingLabel,
    Form,
    InputGroup,
    Nav,
} from "react-bootstrap";
import {ClothingFilter} from "../Types/ClothingFilter";
import NavigationService from "../Services/NavigationService";

export type PageNavigationInfo = {
    path: string;
    state: ClothingFilter | unknown;
};

const SearchNavigationItem: FC = () => {
    // Ref. for checking when the "Enter"-key has been clicked etc.
    const searchInput = useRef<HTMLInputElement>(null);

    const history = useHistory();

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
        history.push(`/search?q=${enteredQuery}`);
    };

    // Effect that add listener for "when the user taps the Enter"-key
    useEffect(() => {
        if (!searchInput.current) return;

        searchInput.current.addEventListener("keyup", handleSubmitSearch);

        // Remove eventlistener as clean-up (remove any old listeners before adding new ones)
        // See "README.md, Sources, #3"
        return () =>
            searchInput?.current?.removeEventListener("keyup", handleSubmitSearch);
    }, [searchInput.current]);

    const handleClearSearchField = () => {
        // Don't continue if we have no "search-field"
        if (!searchInput.current) return;

        const enteredSearchText = searchInput.current.value;

        // Don't navigate back if the search-field is empty and the user clicks on the "clear-field"-icon
        if (enteredSearchText.length === 0) return;

        // Clear search-input
        searchInput.current.value = "";
    };

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
                            onFocus={() => {
                                // Don't set the "previous navigated page" to "/search" -
                                // when the input-field is focused on the search-page
                                if (history.location.pathname.includes("search")) return;

                                // Get info on which page we are at, when the "search-field" is "clicked/selected" by the user
                                NavigationService.updateNavInfo(
                                    history.location.pathname,
                                    history.location.state
                                );
                            }}
                        />
                    </FloatingLabel>
                    <CloseButton
                        style={{
                            height: "2.8rem",
                            position: "absolute",
                            top: "3px",
                            right: "2px",
                        }}
                        onClick={handleClearSearchField}
                    />
                </InputGroup>
            </Nav.Item>
        </Nav>
    );
};

export default SearchNavigationItem;
