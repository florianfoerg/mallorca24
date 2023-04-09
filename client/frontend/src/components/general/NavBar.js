import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

const NavBar = () => {
    return (
        <div className="sticky-top" id="navbar">
            <Navbar collapseOnSelect style={{ backgroundColor: "#063773", height: "100px" }} color='black' expand="sm" bg="#f9f9f9">
                <Container fluid>
                    <Navbar.Brand href="/" className='mx-r' style={{ marginLeft: "20px" }}>
                        <img
                            src="https://raw.githubusercontent.com/check24-scholarships/holiday-challenge/77cec2a5875af15d3deadbf4524d89eb8c92aaf6/default-frontend/public/logo.svg"
                            height="40px"
                            className="d-inline-block align-top"
                            alt="Mallorca24 Logo"
                        />
                    </Navbar.Brand>


                    <NavbarToggle aria-controls='responsive-navbar-nav' />
                    <NavbarCollapse>
                        <Nav className='nav mx-auto' style={{ right: 20, fontWeight: "bold" }}>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;