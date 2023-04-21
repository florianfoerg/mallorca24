import './OffersOfHotel.css';

import React from "react";
import { Button, Card } from "react-bootstrap";
import { LazyLoadComponent, trackWindowScroll } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faDoorClosed, faPizzaSlice, faPlaneArrival, faPlaneDeparture, faWater } from "@fortawesome/free-solid-svg-icons";


export function dayDiff(departureDate, arrivalDate) {
    const timeDifference = arrivalDate.getTime() - departureDate.getTime();
    return Math.ceil(timeDifference / (86400000));
}

function mapOceanview (oceanview) {
    return oceanview ? "ocean view" : "no oceanview";
}


// Set the images for the room types
const roomtypeImages = {
    SINGLE: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    DOUBLE: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    TRIPLE: "https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    APARTMENT: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ACCORDINGDESCRIPTION: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    STUDIO: "https://images.pexels.com/photos/8142976/pexels-photo-8142976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    SUITE: "https://images.pexels.com/photos/6394571/pexels-photo-6394571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    FAMILY: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    DELUXE: "https://images.pexels.com/photos/5474425/pexels-photo-5474425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    SUPERIOR: "https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ECONOMY: "https://images.pexels.com/photos/706137/pexels-photo-706137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    BUNGALOW: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    MULTISHARE: "https://images.pexels.com/photos/7511700/pexels-photo-7511700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    TWINROOM: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    FOURBEDROOM: "https://images.pexels.com/photos/13316618/pexels-photo-13316618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    VILLA: "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    HOLIDAYHOUSE: "https://images.pexels.com/photos/16118049/pexels-photo-16118049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    JUNIORSUITE: "https://images.pexels.com/photos/7031721/pexels-photo-7031721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    DUPLEX: "https://images.pexels.com/photos/12918660/pexels-photo-12918660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}

// representation of a offer as a card with details
export const OfferCard = ({ offer, overview, duration }) => {

    // Get the departure and arrival date
    const departureDate = new Date(offer.outboundDepartureDateTime);
    const arrivalDate = new Date(offer.inboundDepartureDateTime);

    return (
        <Card className="offer-card" style={{ borderRadius: "0" }}>
            <Card.Header as="h5" style={{ display: "flex" }}>
                <div style={{ textAlign: "left", width: "50%" }}>
                    {offer.countAdults > 0 && (<div>Adults: {offer.countAdults}</div>)}
                    {offer.countChildren > 0 && (<div style={{ marginTop: "8px" }}>Children: {offer.countChildren}</div>)}
                </div>
                <div style={{ textAlign: "right", width: "50%" }}>
                    {duration !== undefined ? duration : dayDiff(departureDate, arrivalDate)} Days
                </div>
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                    <div className="offer-card-sec">
                        <Card.Title>Data:</Card.Title>
                        <div>{departureDate.toLocaleString()}</div>
                        <div><FontAwesomeIcon icon={faPlaneDeparture} style={{marginRight: "15px"}}/> {offer.outboundDepartureAirport} <FontAwesomeIcon icon={faArrowTrendUp}  /> PIM </div>

                        <div style={{marginTop: "15px"}}>{arrivalDate.toLocaleString()}</div>
                        <div><FontAwesomeIcon icon={faPlaneArrival} style={{marginRight: "15px"}}/> PIM <FontAwesomeIcon icon={faArrowTrendUp}  /> {offer.outboundDepartureAirport} </div>
                    </div>

                    <div className="offer-card-sec">
                        <Card.Title>Your room:</Card.Title>
                        <img src={roomtypeImages[offer.roomtype]} width={200} height={120} alt="image room"></img>
                        <div style={{marginTop: "15px"}}><FontAwesomeIcon icon={faDoorClosed} /> {offer.roomtype.toLowerCase()}</div>
                        <div><FontAwesomeIcon icon={faWater}  /> {mapOceanview(offer.oceanview)}</div>
                    </div>

                    <div className="offer-card-sec">
                        <Card.Title>Benefits:</Card.Title>
                        <div><FontAwesomeIcon icon={faPizzaSlice} /> {offer.mealtype.toLowerCase()}</div>
                    </div>

                </div>
                {!overview && (
                <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginTop: "15px" }}>
                    <div style={{ height: "100%", justifyContent: "center", fontSize: "23px", marginRight: "10px" }}>
                        <b>{offer.price},- €</b>
                    </div>
                    <Button variant="outline-dark" style={{ borderRadius: "0", width: "150px" }} href={"/offers/overview/" + offer.offerId}>Book offer</Button>
                </div>
                )}

            </Card.Body>
        </Card>
    );
}


// maps all offers to a card
const OffersOfHotel = ({ offers, duration,scrollPosition }) => {
    return (
        <div>
            {offers.map((o, i) => {
                return (
                    <React.Fragment key={i}>
                        <LazyLoadComponent
                            scrollPosition={scrollPosition}
                            style={{ height: "350px", width: "40vw" }}
                        >
                            <OfferCard offer={o} overview={false} duration={duration} />
                        </LazyLoadComponent>
                    </React.Fragment>
                )
            })}

        </div>

    );
}

export default trackWindowScroll(OffersOfHotel);