import React from "react"
import { Button, Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <>
      <Navbar bg="light" variant="success">
        <Navbar.Brand> Blog-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} color="success" to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link>
              Logged in as: {user.name}
              <Button variant="warning" id="logout" onClick={handleLogout}>
                logout{" "}
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Menu
