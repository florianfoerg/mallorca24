import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <div className="sticky-top" id="navbar">
            <Navbar collapseOnSelect style={{ backgroundColor: "#063773", height: "100px" }} expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/" className='mx-r' style={{ marginLeft: "20px" }}>
                        <img
                            src="https://i.imgur.com/ARsWxDA.png"
                            height="40px"
                            className="d-inline-block align-top"
                            alt="Mallorca24 Logo"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;