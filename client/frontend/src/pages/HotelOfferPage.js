import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Banner from '../components/Banner';
import InvalidRequest from '../components/InvalidRequest';

function HotelResultPage() {
    const [validRequest, setValidRequest] = useState(true);
    let allResults = false;
    const [hotel, setHotel] = useState({});

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
                setValidRequest(false) });


        if (allResults) {

            // API request to get all information from the server
            fetch(`http://localhost:8080/hotels/offersOfHotel/${hotel_id}`)
                .then(response => response.json())
                .then(data => {
                });
        }else if (count_adults === undefined || count_children === undefined || duration === undefined || latest_possible === undefined || earliest_possible === undefined) {
            setValidRequest(false);
        } else {


        }
    }, [count_adults, count_children, duration, latest_possible, earliest_possible, hotel_id, allResults]);

    document.title = (validRequest ? hotel.hotelName : "Invalid Request") + " | Mallorca24";



    return (
        <div>
            {!validRequest && (<InvalidRequest />)}
            {validRequest && (<Banner imgSrc={hotel.image} name={hotel.hotelName} />)}
        </div>
    );
}

export default HotelResultPage;
