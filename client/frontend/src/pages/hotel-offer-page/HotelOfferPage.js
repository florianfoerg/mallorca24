import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import InvalidRequest from '../../components/general/InvalidRequest';
import HotelCharasteristicsIcons from '../../components/hotel-offer/HotelCharacteristicsIcons';
import OffersOfHotel from '../../components/hotel-offer/OffersOfHotel';
import { Button } from 'react-bootstrap';
import Banner from '../../components/hotel-offer/Banner';

function min(a, b) {
    return a <b ? a : b;
}

function HotelResultPage() {
    const [validRequest, setValidRequest] = useState(true);
    let allResults = false;
    const [hotel, setHotel] = useState({});
    const [numberBookings, setNumberBookings] = useState(10); //TODO implement backend endpoint
    const [offers, setOffers] = useState([]);

    const [resultsPerSite, setResultsPerSite] = useState(20);
     const [site, setSite] = useState(1);

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
        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/hotels/hotel/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setHotel(data)
            })
            .catch(() => {
                setValidRequest(false)
            });


        if (allResults) {

            // API request to get all information from the server
            fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/hotels/offersOfHotel/${hotel_id}`)
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "max(80vw, 900px)", marginTop: "15px", marginBottom: "15px", fontSize: "20px", textAlign: "left" }}><a href='/' style={{ color: "black", textDecoration: "none" }}><b>Overview</b></a> &gt; {!allResults && (<a href='' style={{textDecoration: "none", color: "black"}}><b>Search results</b> &gt;</a>)} {hotel.hotelName}</div>
                    </div>

                    <Banner img={hotel.image} name={hotel.hotelName} stars={hotel.hotelStars} />
                    <div style={{ marginTop: "30px", fontSize: "20px" }}>On Mallorca24 <b><u>{numberBookings}</u></b> offers of this hotel have already been booked!</div>
                    <HotelCharasteristicsIcons has_pool={hotel.hasPool} free_wifi={hotel.freeWifi} pets_allowed={hotel.petsAllowed} />


                    <div style={{ paddingTop: "30px", textAlign: "center", fontSize: "30px" }} id='offers'> {allResults ? <>All offers</> : <>Filtered offers</>} ({offers.length} results):</div>
                    <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", justifyContent: "center" }}>
                        {offers.length === 0 && (
                            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        )}
                        {offers.length > 0 && (
                            <OffersOfHotel offers={offers.slice(resultsPerSite * (site - 1), min(resultsPerSite * site, offers.length - 1))} />
                        )
                        }
                    </div>
                    <Button onClick={() => setSite(site + 1)}>Next</Button>
                </div>
                )}
        </div>
    );
}

export default HotelResultPage;
