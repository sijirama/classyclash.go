//import React from 'react'
import {Navbar , Nav , Container} from "react-bootstrap"
import {FaSignInAlt , FaSignOutAlt} from "react-icons/fa"

export default function Header() {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Dont Hate, I used bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/login">
                            <FaSignInAlt />
                            Sign In
                        </Nav.Link>
                        <Nav.Link href="/register">
                            <FaSignOutAlt />
                            Sign Up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
