import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Banner from '../components/Banner';

function HotelResultPage() {
    const [hotel, setHotel] = useState({})

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

    if (count_adults === undefined && duration === undefined && latest_possible === undefined && earliest_possible === undefined) {


    } else {


    }


    useEffect(() => {
        // API request to get all information from the server
        fetch(`http://localhost:8080/hotels/hotel/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setHotel(data)
            });

        if (count_adults === undefined && duration === undefined && latest_possible === undefined && earliest_possible === undefined) {

            // API request to get all information from the server
            fetch(`http://localhost:8080/hotels/offersOfHotel/${hotel_id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                });
        }
        else if (count_adults === undefined || count_children === undefined || duration === undefined || latest_possible === undefined || earliest_possible === undefined) {
            return <div>Invalid request</div>;
        } else {


        }
    }, [count_adults, count_children, duration, latest_possible, earliest_possible, hotel_id]);

    document.title = hotel.hotelName + " | Mallorca24";



    return (
        <div>
            <Banner imgSrc={hotel.image} name={hotel.hotelName} />
        </div>
    );
}

export default HotelResultPage;
