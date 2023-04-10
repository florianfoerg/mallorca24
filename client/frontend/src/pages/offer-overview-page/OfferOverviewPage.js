import { useParams } from "react-router-dom";
import { OfferCard } from "../../components/hotel-offer/OffersOfHotel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HotelOverviewCard from "../../components/offer-overview/HotelOverviewCard";
import InvalidRequest from "../../components/general/InvalidRequest";
import Accordion from 'react-bootstrap/Accordion';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import "./OfferOverviewPage.css"

const OfferOverviewPage = () => {
    // Determine if screen width is over 1000 pixels
    const isWidthScreen = useMediaQuery({ minWidth: 1000 });

    // State to hold the fetched offer data
    const [offer, setOffer] = useState(undefined);

    // State to track if the request to fetch the offer was successful
    const [validRequest, setValidRequest] = useState(true);

    // Get the offer ID from the URL parameters
    const { offer_id } = useParams();

    // Set the document title to the offer ID
    document.title = "Overview: #" + offer_id + " | Mallorca24";

    // Fetch the offer data on component mount
    useEffect(() => {
        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/offers/offer/${offer_id}`)
            .then(response => response.json())
            .then(data => {
                setOffer(data)
            })
            .catch(() => {
                setValidRequest(false)
            });
    }, [offer_id]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {/* Display an error message if the request was not valid */}
            {!validRequest && <InvalidRequest></InvalidRequest>}
            {/* Display the offer data if the request was valid */}
            {validRequest && (
                <div style={{ width: isWidthScreen ? "67vw" : "100vw", marginRight: "auto", marginLeft: "auto" }}>
                    {/* Display the offer ID */}
                    <div style={{ textAlign: "left", fontSize: "30px", marginTop: "30px" }}><b>Offer-Overview:</b></div>

                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                        {/* Display the offer data */}
                        {offer !== undefined && offer.hotel !== undefined && offer.outboundDepartureDateTime !== undefined && offer.inboundDepartureDateTime !== undefined && (
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                {/* Display the hotel overview card */}
                                <HotelOverviewCard hotel={offer.hotel} dep={offer.outboundDepartureDateTime} arr={offer.inboundDepartureDateTime} />
                                {/* Display the offer card */}
                                <OfferCard offer={offer} overview={true} />

                                {/* Display the offer price */}
                                <Accordion className="hotel-overview-card" flush >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><b style={{ textAlign: "center", fontSize: "20px", color: "black" }}>Price {offer.price},-€</b></Accordion.Header>
                                        <Accordion.Body>
                                            <div>Price per person: {offer.price / (offer.countAdults + offer.countChildren)},-€</div>
                                            <div style={{ color: "gray" }}>19% taxes | § 12 UStG</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <br />

                                {/* Display the complete purchase button */}
                                <div style={{ marginTop: "15px", width: "70vw" }}>
                                    <Button variant="outline-dark" style={{ borderRadius: "0", marginBottom: "20px", width: "250px", height: "100px", fontSize: "20px"}} href={"/offers/confirm-booking/" + offer_id}>
                                        <div style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }} >
                                            <FontAwesomeIcon icon={faUmbrellaBeach} className="beach-icon" />
                                            <b style={{marginLeft: "5px"}}>Complete purchase</b>
                                        </div>

                                    </Button>
                                </div>
                            </div>
                        )}</div>
                </div>
            )
            }
        </div>
    );

}

export default OfferOverviewPage;