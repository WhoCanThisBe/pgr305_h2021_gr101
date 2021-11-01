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
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default Routing;