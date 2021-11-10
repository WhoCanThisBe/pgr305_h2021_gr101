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

const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Container>
              <NavigationBar />
        <Switch>
          <Route
            path={["/female-clothing", "/male-clothing", "/unisex-clothing"]}
            render={(props) => {
              return (
                <ClothesProvider>
                  <Clothing {...props} />
                </ClothesProvider>
              );
            }}
          />
          <Route
            path={["/female-home", "/male-home", "/unisex-home"]}
            render={(props) => {
              let component;

              if (props.location.pathname.includes("female")) {
                component = <FemaleHome />;
              } else if (props.location.pathname.includes("male")) {
                component = <MaleHome />;
              } else if (props.location.pathname.includes("unisex")) {
                component = <UnisexHome />;
              }

                return (
                    <ClothesProvider>
                            <CartProvider>
                                {component}
                            </CartProvider>
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
