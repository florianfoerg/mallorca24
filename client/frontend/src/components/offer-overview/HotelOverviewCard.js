import { Card } from "react-bootstrap";
import HotelCharasteristicsIcons from "../hotel-offer/HotelCharacteristicsIcons";
import { Rating } from "react-simple-star-rating";
import './HotelOverviewCard.css'
import { dayDiff } from "../hotel-offer/OffersOfHotel";


const HotelOverviewCard = ({ hotel, dep, arr }) => {
    const nights = dayDiff(new Date(dep), new Date(arr)) - 1;

    return (
        <Card className="hotel-overview-card" style={{ borderRadius: "0" }}>
            <Card.Header as="h5" style={{ display: "flex" }}>
                <div style={{ textAlign: "left", width: "50%" }}>
                    {hotel.hotelName}
                </div>
                <div style={{ textAlign: "right", width: "50%" }}>
                    <Rating initialValue={hotel.hotelStars} readonly="true" size={30} fillColor="#063773" />
                </div>
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                    <div>
                        <img src={hotel.image} style={{ width: "min(600px, 60vw)" }}></img>
                    </div>

                    <div style={{ maxWidth: "100%", minWidth: "300px" }}>
                        <HotelCharasteristicsIcons has_pool={hotel.hasPool} free_wifi={hotel.freeWifi} pets_allowed={hotel.petsAllowed} />
                    </div>

                </div>

            </Card.Body>
            <div style={{ marginBottom: "20px" }}>You will stay at {hotel.hotelName} for {nights} night{nights > 1 && "s"}! </div>
        </Card>
    );
}


export default HotelOverviewCard;