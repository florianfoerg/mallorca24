import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
    const isWidthScreen = useMediaQuery({ minWidth: 1000 });

    return (
        <div>
            <a className='to-top' href="#">
                Jump to the top
            </a>
            <div style={{ paddingBottom: "46px", backgroundColor: "#063773", color: "white", height: "300px", paddingTop: "46px" }}>
                <Container fluid="xxl">
                    <Row style={{ height: "150px" }}>
                        <Col style={{ textAlign: "center" }}>
                            <a style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }} href='https://urlaub.check24.de/'>
                                <img
                                    src="https://raw.githubusercontent.com/check24-scholarships/holiday-challenge/77cec2a5875af15d3deadbf4524d89eb8c92aaf6/default-frontend/public/logo.svg"
                                    height="40px"
                                    className="d-inline-block align-top"
                                    alt="Mallorca24 Logo"
                                />
                            </a>
                        </Col>

                        {isWidthScreen && (<Col style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                                Project was created as part of the CHECK24 GenDev Coding Challenge 2023. <br />
                                The GenDev Scholarship was created to help aspiring students in the field of computer science focus onhands-on experience and working on production code.
                            </div>
                        </Col>)}

                        <Col style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                                <div>See source code here:</div><br />
                                <a href='https://github.com/florianfoerg/mallorca24' style={{ color: "white" }}><FontAwesomeIcon icon={faGithub} style={{ height: "40px" }} /></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div style={{ textAlign: "center", marginTop: "30px" }}>Florian Förg | Copyright@{new Date().getFullYear()} | <a href="/impressum" style={{ color: "#f9f9f9" }}>Impressum</a></div>
            </div>
        </div>
    );
}

export default Footer;