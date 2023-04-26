import { Button } from "react-bootstrap";

const Imprint = () => {
  return (
    <div className="invalid-request" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <h1>Imprint</h1>
        <p style={{ marginTop: "25%" }}>
          Florian Förg<br />
          <a href="https://florianfoerg.com">florianfoerg.com</a> <br />
          E-Mail: contact@florianfoerg.com
        </p>
        <Button
          variant="outline-light"
          title="Go back"
          style={{ maxWidth: "200px", marginTop: "50%", borderRadius: "0", color: "#063773", borderColor: "#063773" }}
          href="/"
        >
          Back to main page
        </Button>
      </div>
    </div>
  );
};

export default Imprint;
