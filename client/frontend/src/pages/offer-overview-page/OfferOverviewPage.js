import { useParams } from "react-router-dom";
import { OfferCard } from "../../components/hotel-offer/OffersOfHotel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HotelOverviewCard from "../../components/offer-overview/HotelOverviewCard";
import InvalidRequest from "../../components/general/InvalidRequest";
import Accordion from 'react-bootstrap/Accordion';


const OfferOverviewPage = () => {
    const isWidthScreen = useMediaQuery({ minWidth: 1000 });
    const [offer, setOffer] = useState(undefined);

    const [validRequest, setValidRequest] = useState(true);

    const { offer_id } = useParams();


    document.title = "Overview: #" + offer_id + " | Mallorca24"

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
            {!validRequest && <InvalidRequest></InvalidRequest>}
            {validRequest && (
                <div style={{ width: isWidthScreen ? "67vw" : "100vw", marginRight: "auto", marginLeft: "auto" }}>
                    <div style={{ textAlign: "left", fontSize: "30px", marginTop: "30px" }}><b>Overview #{offer_id}:</b></div>

                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>{offer !== undefined && offer.hotel !== undefined && offer.outboundDepartureDateTime !== undefined && offer.inboundArrivalDateTime !== undefined &&
                        (
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                <HotelOverviewCard hotel={offer.hotel} dep={offer.outboundDepartureDateTime} arr={offer.inboundArrivalDateTime} />
                                <OfferCard offer={offer} overview={true} />

                                <Accordion className="hotel-overview-card" flush >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><b style={{ textAlign: "center", fontSize: "20px", color: "black" }}>Price {offer.price},-€</b></Accordion.Header>
                                        <Accordion.Body>
                                            <div>Price per person: {offer.price / (offer.countAdults + offer.countChildren)},-€</div>
                                            <div style={{ color: "gray" }}>19% taxes | § 12 UStG</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        )}</div>
                </div>
            )
            }
        </div>
    );

}

export default OfferOverviewPage;