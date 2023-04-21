import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InvalidRequest from "../../components/general/InvalidRequest";

const BookingSuccessPage = () => {
  const [validRequest, setValidRequest] = useState(true);
  const { booking_id } = useParams();

  useEffect(() => {
    fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/bookings/validate/${booking_id}`)
      .then(response => {
        if (response.status !== 200) {
          setValidRequest(false);
        }
      });
  }, [booking_id]);

  return (
    <div>
      {!validRequest && <InvalidRequest />}
      {validRequest && (
        <div className="invalid-request">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
            <div style={{ fontSize: "5vh", alignSelf: "center", textAlign: "center", color: "#063773" }}>
              Done! Thank you for your booking!
            </div>
            <div style={{ fontSize: "2vh", alignSelf: "center", textAlign: "center", color: "#063773" }}>
              We have sent you an email with your booking details <br />
              In case of questions refer to the booking id: {booking_id} <br />
              <a href="/about">More information</a>
            </div>
            <img src="https://www.creativefabrica.com/wp-content/uploads/2023/03/06/Mallorca-Tropical-Splash-Watercolor-Graphics-63443526-1-1-580x387.jpg" style={{ height: "20vh", marginTop: "20px" }} alt={'image penguin'} />
            <Button variant="outline-light" title='Go back' style={{ maxWidth: "200px", marginTop: "3%", borderRadius: "0", color: "#063773", borderColor: "#063773" }} href='/'>
              Back to main page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSuccessPage;
