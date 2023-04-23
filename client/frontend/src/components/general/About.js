import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"


const About = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", minHeight: "calc(100vh - 480px)", margin: "50px" }}>
            <div style={{ width: "max(70vw, 400px)", textAlign: "center", marginTop: "50px" }}>

                <h1>About</h1>

                <br />

                This project Mallorca24 was created by Florian Förg as part of the CHECK24 GenDev Holiday Coding Challenge 2023. <br />
                The GenDev Scholarship aims to help aspiring students in the field of computer science focus on what truly matters: getting your IT projects done. Hands-on experience and working on production code at a young age is the cornerstone for developing great software solutions later in life. <br />

                <br />

                Technologies used: <br />

                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    <div style={{ textAlign: "left" }}>
                        <b>Frontend</b>
                        <li>React</li>
                        <li>JavaScript</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Bootstrap</li>
                    </div>
                    <br />

                    <div style={{ textAlign: "left", marginLeft: "50px" }}>

                        <b>Backend:</b>
                        <li>Java</li>
                        <li>Python</li>
                        <li>Spring Framework</li>
                        <li>MySQL</li>
                        <br />
                    </div>

                </div>

                <p style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Source code and implementation/architecture details can be found on GitHub: <br />
                </p>

                <a href='https://github.com/florianfoerg/mallorca24' style={{ color: "#063773", marginTop: "50px" }}><FontAwesomeIcon icon={faGithub} style={{ height: "100px" }} /></a>

                <br />

                <Button variant="outline-light" title='Go back' style={{ maxWidth: "200px", marginTop: "80px", borderRadius: "0", color: "#063773", borderColor: "#063773" }} href='/'>Back to main page</Button>

            </div>
        </div>
    )
}

export default About