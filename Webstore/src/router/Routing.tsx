import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "../Pages/Home";
import FemaleHome from "../Pages/FemaleHome";
import MaleHome from "../Pages/MaleHome";
import UnisexHome from "../Pages/UnisexHome";
import NavigationBar from "../Navigation/NavigationBar";
import ClothesProvider from "../Contexts/ClothesContext";
import Clothing from "../Pages/Clothing";
import Cart from "../Pages/Cart";
import CartProvider from "../Contexts/CartContext";
import Admin from "../Pages/Admin";
import UpdateClothingForm from "../Components/Admin/UpdateClothingForm";
import ClothingDetails from "../Pages/ClothingDetails";
import Search from "../Pages/Search";

const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route
            path={"/search"}
            render={() => (
              <ClothesProvider>
                <Search />
              </ClothesProvider>
            )}
          />
          <Route
            path={["/Female-clothing", "/Male-clothing", "/Unisex-clothing"]}
            render={(props) => {
              return (
                <ClothesProvider>
                  <Clothing {...props} />
                </ClothesProvider>
              );
            }}
          />
          <Route
            path={["/Female-home", "/Male-home", "/Unisex-home"]}
            render={(props) => {
              let component;

              if (props.location.pathname.includes("Female")) {
                component = <FemaleHome />;
              } else if (props.location.pathname.includes("Male")) {
                component = <MaleHome />;
              } else if (props.location.pathname.includes("Unisex")) {
                component = <UnisexHome />;
              }

              return (
                <ClothesProvider>
                  <CartProvider>{component}</CartProvider>
                </ClothesProvider>
              );
            }}
          />
          <Route
            path={"/admin"}
            render={(props) => {
              return (
                <ClothesProvider>
                  <Admin {...props} />
                </ClothesProvider>
              );
            }}
          />
          <Route
            path="/update-clothing/:id"
            render={() => {
              return (
                <ClothesProvider>
                  <UpdateClothingForm />
                </ClothesProvider>
              );
            }}
          />
          <Route
            path={"/cart"}
            render={(props) => (
              <CartProvider>
                <Cart {...props} />
              </CartProvider>
            )}
          />
          <Route
            path={"/:brandName-:clothingName"}
            render={() => (
              <ClothesProvider>
                <CartProvider>
                  <ClothingDetails />
                </CartProvider>
              </ClothesProvider>
            )}
          />
          <Route
            exact
            path={"/"}
            render={(props) => (
              <ClothesProvider>
                <CartProvider>
                  <Home {...props} />
                </CartProvider>
              </ClothesProvider>
            )}
          />
          {/*TODO: Fix a better 404 when you have time*/}
          <Route render={() => <h3>404 :(</h3>} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Routing;
