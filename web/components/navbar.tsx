import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export function AppNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Reto Liberet</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Nav.Link href="services">Servicios</Nav.Link>
            <Nav.Link href="history">Historial de actividad</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
