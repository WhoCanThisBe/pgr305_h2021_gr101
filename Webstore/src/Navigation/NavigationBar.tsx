import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../Images/logo.svg'
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return(
        <div >
            <Navbar bg="myGrey menuOpt" variant="dark">
                <Navbar.Brand>
                  <Nav.Link as={Link} to={"/"}>
                    <img src={logo} width="40px" height="40px"/>
                    Logo
                  </Nav.Link>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to={"/female-home"}> Female
                        <NavDropdown title="">
                            <NavDropdown.Item>Klær</NavDropdown.Item>
                            <NavDropdown.Item>Sko</NavDropdown.Item>
                            <NavDropdown.Item>Accesories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/male-home"}>Male
                        <NavDropdown title="" >
                            <NavDropdown.Item>Klær</NavDropdown.Item>
                            <NavDropdown.Item>Sko</NavDropdown.Item>
                            <NavDropdown.Item>Accesories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/unisex-home"}>Unisex
                        <NavDropdown title="">
                            <NavDropdown.Item>Klær</NavDropdown.Item>
                            <NavDropdown.Item>Sko</NavDropdown.Item>
                            <NavDropdown.Item>Accesories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>


                </Nav>
            </Navbar>
        </div>
    )

}

export default NavigationBar;
