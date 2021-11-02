import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "../Pages/Home";
import FemaleHome from "../Pages/FemaleHome";
import MaleHome from "../Pages/MaleHome";
import UnisexHome from "../Pages/UnisexHome";
import NavigationBar from "../Navigation/NavigationBar";
import ClothesProvider from "../Contexts/ClothesContext";

const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route
            path={["/female-clothing", "/male-clothing", "/unisex-clothing"]}
            render={(props) => {
              return <h2>{props.location.pathname}</h2>;
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

              return <ClothesProvider>{component}</ClothesProvider>;
            }}
          />
          <Route
            exact
            path={"/"}
            render={(props) => (
              <ClothesProvider>
                <Home {...props} />
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
