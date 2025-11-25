
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext"; 

export default function NavBar() {
  const { cart } = useCart(); 
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Koubas</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
            <Nav.Link as={Link} to="/panier">
              Panier{" "}
              {totalItems > 0 && <Badge bg="info">{totalItems}</Badge>} 
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
