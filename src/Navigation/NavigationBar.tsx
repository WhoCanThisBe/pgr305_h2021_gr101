import { Nav, Navbar } from "react-bootstrap";
import logo from "../Images/logo.svg";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="myGrey" variant="dark">
        <Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            <img src={logo} alt={""} />
            Logo
          </Nav.Link>
        </Navbar.Brand>
        {/* TODO: Find a better solution than using margin here */}
        <Nav style={{ margin: "0 20px" }}>
          <Nav.Link as={Link} to={"/female-home"}>
            Female
          </Nav.Link>
          <Nav.Link as={Link} to={"/male-home"}>
            Male
          </Nav.Link>
          <Nav.Link as={Link} to={"/unisex-home"}>
            Unisex
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
