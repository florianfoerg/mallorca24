import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Banner from '../../components/Banner';
import InvalidRequest from '../../components/InvalidRequest';
import HotelCharasteristicsIcons from '../../components/HotelCharacteristicsIcons';
import OffersOfHotel from '../../components/OffersOfHotel';

function HotelResultPage() {
    const [validRequest, setValidRequest] = useState(true);
    let allResults = false;
    const [hotel, setHotel] = useState({});
    const [numberBookings, setNumberBookings] = useState(10); //TODO implement backend endpoint
    const [offers, setOffers] = useState([]);

    const { hotel_id } = useParams();

    // Retrieve query parameters from the URL
    const queryParams = new URLSearchParams(useLocation().search);
    const {
        //required when not all results should be shown
        count_adults,
        count_children,
        latest_possible,
        earliest_possible,
        duration,

        //optional
        departure_airports,
        roomtypes,
        min_stars,
        max_price,
        mealtypes,
        oceanview
    } = Object.fromEntries(queryParams.entries());

    if (!allResults && count_adults === undefined && duration === undefined && latest_possible === undefined && earliest_possible === undefined) {
        allResults = true;
    }

    useEffect(() => {

        // API request to get all information from the server
        fetch(`http://localhost:8080/hotels/hotel/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setHotel(data)
            })
            .catch(() => {
                console.log("uhsdchuas")
                setValidRequest(false)
            });


        if (allResults) {

            // API request to get all information from the server
            fetch(`http://localhost:8080/hotels/offersOfHotel/${hotel_id}`)
                .then(response => response.json())
                .then(data => {
                    setOffers(data)
                });
        } else if (count_adults === undefined || count_children === undefined || duration === undefined || latest_possible === undefined || earliest_possible === undefined) {
            setValidRequest(false);
        } else {


        }
    }, [count_adults, count_children, duration, latest_possible, earliest_possible, hotel_id, allResults]);

    document.title = (validRequest ? hotel.hotelName : "Invalid Request") + " | Mallorca24";



    return (
        <div>
            {!validRequest && (<InvalidRequest />)}
            {validRequest &&
                (<div style={{ textAlign: "center" }}>
                    <Banner img={hotel.image} name={hotel.hotelName} stars={hotel.hotelStars} />
                    <div style={{ marginTop: "30px", fontSize: "20px" }}>On Mallorca24 <b><u>{numberBookings}</u></b> offers of this hotel have already been booked!</div>
                    <HotelCharasteristicsIcons has_pool={hotel.hasPool} free_wifi={hotel.freeWifi} pets_allowed={hotel.petsAllowed} />


                <div style={{marginTop:"30px", textAlign: "center"}} id='offers'> {allResults ? <>All offers</> : <>Filtered offers</>} ({offers.length} results:)</div>
                <div style={{marginTop:"30px", display: "flex", justifyContent: "center"}}>
                {offers.length === 0 && (
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                )}
                {offers.length > 0 && (
                    <OffersOfHotel offers={offers}/>
                )
                }
                </div>

                </div>
                )}
        </div>
    );
}

export default HotelResultPage;
