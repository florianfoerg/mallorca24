import './InvalidRequest.css';

import { Button } from 'react-bootstrap';

const InvalidRequest = () => {
  return (
    <div className="invalid-request">
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <div style={{ fontSize: "5vh", alignSelf: "center", textAlign: "center", color: "#063773" }}>
          Invalid request
        </div>
        <div style={{ fontSize: "3vh", alignSelf: "center", textAlign: "center", color: "#063773" }}>
          Unfortunately this site does not exist.
        </div>
        <img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/penguin-7837-16545-550x550.png" style={{ height: "20vh", marginTop: "20px" }} alt="Penguin" />

        <Button
          variant="outline-light"
          title="Go back"
          style={{ maxWidth: "200px", marginTop: "3%", borderRadius: "0", color: "#063773", borderColor: "#063773" }}
          href="/"
        >
          Back to main page
        </Button>
      </div>
    </div>
  );
};

export default InvalidRequest;
