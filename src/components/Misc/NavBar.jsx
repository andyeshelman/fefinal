import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

// function Login() {
//   return (
//     <NavDropdown title="Login">
//       <Form>
//         <NavDropdown.Item><Form.Control type="text" name='username' placeholder='Username'/></NavDropdown.Item>
//         <NavDropdown.Item><Form.Control type="password" name='password' placeholder='Password'/></NavDropdown.Item>
//         <NavDropdown.Item><Button>Login</Button></NavDropdown.Item>
//       </Form>
//       <NavDropdown.Divider />
//       <NavDropdown.Item>
//         <Button variant="outline-warning" onClick={() => setLogin("admin")}>
//           Login as Admin
//         </Button>
//       </NavDropdown.Item>
//     </NavDropdown>
//   )
// }


function NavBar() {
  return (
    <Navbar fixed="top" expand="md" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">eStore</Navbar.Brand>
        <Navbar.Toggle className="border border-white" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/customer">Customers</Nav.Link>
            <Nav.Link href="/product">Products</Nav.Link>
            <Nav.Link href="/order">Orders</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
