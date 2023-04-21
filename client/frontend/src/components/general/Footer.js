import './Footer.css';

import { Col, Container, Row } from 'react-bootstrap';
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

      <div style={{
        paddingBottom: "46px",
        backgroundColor: "#063773",
        color: "white",
        height: "300px",
        paddingTop: "46px"
      }}>
        <Container fluid="xxl">
          <Row style={{ height: "150px" }}>
            <Col style={{ textAlign: "center" }}>
              <a href='https://urlaub.check24.de/' style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                alignItems: "center"
              }}>
                <img src="https://raw.githubusercontent.com/check24-scholarships/holiday-challenge/77cec2a5875af15d3deadbf4524d89eb8c92aaf6/default-frontend/public/logo.svg"
                  height="40px"
                  className="d-inline-block align-top"
                  alt="Mallorca24 Logo"
                />
              </a>
            </Col>

            {isWidthScreen && (
              <Col style={{ textAlign: "center" }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "center"
                }}>
                  <div>Project was created as part of the CHECK24 GenDev Coding Challenge 2023.</div>
                  <div>The GenDev Scholarship aims to help aspiring students in the field of computer science focus on hands-on experience and working on production code.</div>
                </div>
              </Col>
            )}

            <Col style={{ textAlign: "center" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                alignItems: "center"
              }}>
                <div>See source code here:</div>
                <a href='https://github.com/florianfoerg/mallorca24' style={{ color: "white" }} title='Go to source code'>
                  <FontAwesomeIcon icon={faGithub} style={{ height: "40px", marginTop: "20px" }} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          Florian Förg | Copyright@{new Date().getFullYear()} | <a href="https://www.linkedin.com/in/florian-foerg" style={{ color: "#f9f9f9" }}>LinkedIn</a> | <a href="/imprint" style={{ color: "#f9f9f9" }}>Imprint</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
