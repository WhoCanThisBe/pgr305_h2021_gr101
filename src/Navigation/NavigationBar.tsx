import {Nav,Navbar} from "react-bootstrap";
import logo from '../Images/logo.svg'
import {Link} from "react-router-dom";

const NavigationBar = () =>{

    return(
        <div>
            <Navbar bg="myGrey" variant="dark">
                <Navbar.Brand>
                    <img src={logo}/>
                    Logo
                </Navbar.Brand>

                <Nav>
                    <Nav.Link as={Link} to={"/female-home"}>Female</Nav.Link>
                    <Nav.Link as={Link} to={"/male-home"}>Male</Nav.Link>
                    <Nav.Link as={Link} to={"/unisex-home"}>Unisex</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )

}

export default NavigationBar;