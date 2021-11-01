import {FC} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";
import Home from "../Pages/Home";

const Routing: FC = () => {

    return(
        <BrowserRouter>
            <Container>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/female-home" component={FemaleHome}/>
                    <Route path="/male-home" component={MaleHome}/>
                    <Route path="/unisex-home" component={UnisexHome}/>
                    {/*TODO: Fix a better 404 when you have time*/}
                    <Route render={() => <h3>404 :(</h3>}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default Routing;