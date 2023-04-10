import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import InvalidRequest from "../../components/general/InvalidRequest";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faPerson, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

async function bookOffer(email, offer_id, navigate, setValidRequest) {
    try {
        const response = await fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/bookings/booking/${offer_id}?email=${email}`, {
            method: 'POST'
        });
        const data = await response.json();
        navigate("/bookings/success/" + data);
    } catch (error) {
        setValidRequest(false)
    }
}


const ConfirmBookingPage = () => {
    // Determine if screen width is over 1000 pixels
    const isWidthScreen = useMediaQuery({ minWidth: 1000 });

    // State to track if the request to fetch the offer was successful
    const [validRequest, setValidRequest] = useState(true);

    // Get the offer ID from the URL parameters
    const { offer_id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/offers/validate/${offer_id}`)
            .then(response => {
                if (response.status !== 200) {
                    setValidRequest(false);
                }
            });
    }, [offer_id]);

    // contact form
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {/* Display an error message if the request was not valid */}
            {!validRequest && <InvalidRequest></InvalidRequest>}
            {/* Display the offer data if the request was valid */}
            {validRequest && (
                <div style={{ width: isWidthScreen ? "67vw" : "100vw", marginRight: "auto", marginLeft: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "100%", marginTop: "15px", marginBottom: "15px", fontSize: "20px", textAlign: "left" }}><a href={'/offers/overview/' + offer_id} style={{ color: "black", textDecoration: "none" }}><b>Offer-Overview</b></a> &gt; Confirmation</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <div style={{ backgroundColor: "#063773", color: "white", width: "70%", minHeight: "50px", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                            You can leave all fields empty except of the email address. We will send you a confirmation email to this address.
                        </div>
                    </div>


                    <Form onSubmit={async (event) => {
                        event.preventDefault();
                        const { email } = event.target.elements
                        
                        await bookOffer(email.value, offer_id, navigate, setValidRequest)
                    }}
                    >
                        <div>
                            <Card className="offer-card" style={{ borderRadius: "0" }}>
                                <Card.Header as="h5" style={{ display: "flex" }}>
                                    <div style={{ textAlign: "left", width: "50%" }}>
                                        Personal information
                                    </div>
                                    <div style={{ textAlign: "right", width: "50%" }}>
                                        <FontAwesomeIcon icon={faPerson} />
                                    </div>
                                </Card.Header>
                                <Card.Body style={{ padding: "25px" }}>


                                    <Form.Group className="mb-3">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control type="text" placeholder="First name" style={{ borderRadius: "0" }} />
                                        <Form.Control type="text" placeholder="Last name" style={{ borderRadius: "0", marginTop: "10px" }} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Street" style={{ borderRadius: "0" }} />
                                        <Form.Control type="text" placeholder="City" style={{ borderRadius: "0", marginTop: "10px" }} />
                                        <Form.Control type="text" placeholder="Country" style={{ borderRadius: "0", marginTop: "10px" }} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" style={{ borderRadius: "0" }} required={true} name="email" />
                                        <Form.Text className="text-muted">
                                            For test purposes we will send you a confirmation email to this address as well as store it in our database.
                                        </Form.Text>
                                    </Form.Group>


                                </Card.Body>
                            </Card>

                            <Card className="offer-card" style={{ borderRadius: "0" }}>
                                <Card.Header as="h5" style={{ display: "flex" }}>
                                    <div style={{ textAlign: "left", width: "50%" }}>
                                        Payment information
                                    </div>
                                    <div style={{ textAlign: "right", width: "50%" }}>
                                        <FontAwesomeIcon icon={faCashRegister} />
                                    </div>
                                </Card.Header>
                                <Card.Body style={{ padding: "25px" }}>
                                    <div style={{ textAlign: "center" }}><u>Choose payment method:</u></div>

                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                        <a href="https://paypal.com"><img src="https://static.vecteezy.com/system/resources/previews/009/469/637/large_2x/paypal-payment-icon-editorial-logo-free-vector.jpg" style={{ width: "250px" }} alt="logo paypal"></img></a>
                                        <a href="https://visa.com"><img src="https://static.vecteezy.com/system/resources/previews/009/469/638/non_2x/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg" alt="logo visa" style={{ width: "250px" }}></img></a>
                                        <a href="https://mastercard.com"><img src="https://static.vecteezy.com/system/resources/previews/019/550/609/non_2x/master-card-editorial-logo-free-vector.jpg" alt="logo master card" style={{ width: "250px" }} /></a>
                                    </div>


                                </Card.Body>
                            </Card>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

                            {/* Display the complete purchase button */}
                            <Button type="submit" variant="outline-dark" style={{ borderRadius: "0", marginBottom: "20px", width: "250px", height: "100px", fontSize: "20px", marginTop: "15px" }}>
                                
                                <div style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }} >
                                    <FontAwesomeIcon icon={faUmbrellaBeach} className="beach-icon" />
                                    <b style={{ marginLeft: "5px" }}>Confirm and pay</b>
                                </div>

                            </Button>
                        </div>
                    </Form>

                </div>
            )}
        </div>
    );

}

export default ConfirmBookingPage;