import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import InvalidRequest from '../../components/general/InvalidRequest';
import HotelCharacteristicsIcons from '../../components/hotel-offer/HotelCharacteristicsIcons';
import OffersOfHotel from '../../components/hotel-offer/OffersOfHotel';
import HotelBanner from '../../components/hotel-offer/HotelBanner';
import SiteOrganizer from '../../components/general/SiteOrganizer';
import LocationComp from '../../components/hotel-offer/LocationComp';
import { min } from '../../components/general/Math';
import NoResultsFound from '../../components/general/NoResultsFound';
import { Spinner } from 'react-bootstrap';


function HotelResultPage() {
    const [validRequest, setValidRequest] = useState(true);
    let allResults = false;
    const [hotel, setHotel] = useState({});
    const [amountBookings, setAmountBookings] = useState(0);
    const [offers, setOffers] = useState([]);
    const [offersLoaded, setOffersLoaded] = useState(false);

    const [site, setSite] = useState(1);
    const offersRef = useRef(null);

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
        max_price,
        oceanview,
        has_pool,
        min_stars,
    } = Object.fromEntries(queryParams.entries());

    // optional
    const roomtypes = queryParams.getAll('roomtypes');
    const departure_airports = queryParams.getAll('departure_airports');
    const mealtypes = queryParams.getAll('mealtypes');

    if (!allResults && count_adults === undefined && duration === undefined && latest_possible === undefined && earliest_possible === undefined) {
        allResults = true;
    }

    useEffect(() => {

        // API request to get all information from the server
        fetch(window.backendPath + `/hotels/hotel/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setHotel(data)
            })
            .catch(() => {
                setValidRequest(false)
            });

        fetch(window.backendPath + `/bookings/hotelBookings/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setAmountBookings(data);
            })
            .catch(() => {
                setValidRequest(false)
            });


        if (allResults) {

            // API request to get all information from the server
            fetch(window.backendPath + `/hotels/offersOfHotel/${hotel_id}`)
                .then(response => response.json())
                .then(data => {
                    setOffers(data);
                    setOffersLoaded(true);
                });
        } else if (count_adults === undefined || count_children === undefined || duration === undefined || latest_possible === undefined || earliest_possible === undefined) {
            setValidRequest(false);
        } else {

            const filteredRequest = {
                filter: (roomtypes && roomtypes.length > 0 ? ["ROOMTYPE"] : [])
                    .concat(oceanview !== undefined ? ["OCEANVIEW"] : [])
                    .concat((mealtypes && mealtypes.length > 0 ? ["MEALTYPE"] : []))
                    .concat(max_price !== undefined ? ["PRICE"] : [])
                    .concat((departure_airports && departure_airports.length > 0 ? ["AIRPORT"] : []))
                    .concat(has_pool !== undefined ? ["POOL"] : [])
                    .concat(min_stars !== undefined ? ["STARS"] : []),
                roomtypes,
                mealtypes,
                countAdults: parseInt(count_adults),
                countChildren: parseInt(count_children),
                departureAirports: departure_airports,
                earliestPossible: earliest_possible + " 00:00:00",
                latestPossible: latest_possible + " 23:59:59",
                duration: parseInt(duration),
                maxPrice: max_price,
                oceanview: oceanview,
                hasPool: has_pool,
                minStars: min_stars,
            };

            // API request to get all information from the server
            fetch(window.backendPath + `/hotels/offersOfHotelFiltered/${hotel_id}`, {
                method: "POST",
                body: JSON.stringify(filteredRequest),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setOffers(data);
                    setOffersLoaded(true);
                })
                .catch(() => {
                    setValidRequest(false);
                    });
        }
        // eslint-disable-next-line 
    }, [count_adults, count_children, duration, latest_possible, earliest_possible, hotel_id, allResults, max_price, oceanview, has_pool, min_stars]);

    document.title = (validRequest ? hotel.hotelName : "Invalid Request") + " | Mallorca24";

    return (
        <div>

            {!validRequest && (<InvalidRequest />)}
            {validRequest &&
                (<div style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "max(80vw, 900px)", marginTop: "15px", marginBottom: "15px", fontSize: "20px", textAlign: "left" }}><a href='/' style={{ color: "black", textDecoration: "none" }}><b>Overview</b></a> &gt; {!allResults && (<a href={"/search?" + queryParams.toString()} style={{ textDecoration: "none", color: "black" }}><b>Search results</b> &gt;</a>)} {hotel.hotelName}</div>
                    </div>

                    <HotelBanner img={hotel.image} name={hotel.hotelName} stars={hotel.hotelStars} />
                    <div style={{ marginTop: "30px", fontSize: "20px" }}>On Mallorca24 <b><u>{amountBookings}</u></b> offers of this hotel have already been booked!</div>
                    <HotelCharacteristicsIcons has_pool={hotel.hasPool} free_wifi={hotel.freeWifi} pets_allowed={hotel.petsAllowed} />

                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <div style={{ width: "80vw", marginTop: "30px" }}>
                            <p><b>Description: </b>{hotel.description}</p>
                        </div>
                        <LocationComp hotel={hotel} />
                    </div>


                    <div style={{ paddingTop: "30px", textAlign: "center", fontSize: "30px" }} id='offers' ref={offersRef}> {allResults ? <>All offers</> : <>Filtered offers</>}: {offersLoaded && (offers.length + " found")}</div>
                    <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", justifyContent: "center" }}>
                        {!offersLoaded && (
                            <Spinner animation="border" role="status" style={{ marginLeft: "15px", borderWidth: "3px" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {offersLoaded && offers.length > 0 && (
                            <div>
                                <OffersOfHotel offers={offers.slice(20 * (site - 1), min(20 * site, offers.length))} duration={duration !== undefined ? duration : undefined} />
                                <SiteOrganizer setSite={setSite} site={site} amountSites={Math.ceil(offers.length / 20)} scrollRef={offersRef} />
                            </div>
                        )
                        }
                        {offersLoaded && offers.length === 0 && (
                            <NoResultsFound />
                        )}
                    </div>

                </div>
                )}
        </div>
    );
}

export default HotelResultPage;
