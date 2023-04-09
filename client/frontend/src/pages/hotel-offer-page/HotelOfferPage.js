import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import InvalidRequest from '../../components/general/InvalidRequest';
import HotelCharacteristicsIcons from '../../components/hotel-offer/HotelCharacteristicsIcons';
import OffersOfHotel from '../../components/hotel-offer/OffersOfHotel';
import Banner from '../../components/hotel-offer/Banner';
import SiteOrganizer from '../../components/general/SiteOrganizer';
import MapSection from '../../components/hotel-offer/MapSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCity, faPlane, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import LocationComp from '../../components/hotel-offer/LocationComp';

function min(a, b) {
    return a < b ? a : b;
}

function HotelResultPage() {
    const [validRequest, setValidRequest] = useState(true);
    let allResults = false;
    const [hotel, setHotel] = useState({});
    const [amountBookings, setAmountBookings] = useState(0);
    const [offers, setOffers] = useState([]);

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
        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/hotels/hotel/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setHotel(data)
            })
            .catch(() => {
                setValidRequest(false)
            });

        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/bookings/hotelBookings/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                setAmountBookings(data);
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
            const filteredRequest = {
                filter: (roomtypes && roomtypes.length > 0 ? ["ROOMTYPE"] : [])
                    .concat(oceanview !== undefined ? ["OCEANVIEW"] : [])
                    .concat((mealtypes && mealtypes.length > 0 ? ["MEALTYPE"] : []))
                    .concat(max_price !== undefined ? ["PRICE"] : [])
                    .concat((departure_airports && departure_airports.length > 0 ? ["AIRPORT"] : [])),
                roomtypes,
                mealtypes,
                countAdults: parseInt(count_adults),
                countChildren: parseInt(count_children),
                departureAirports: departure_airports,
                earliestPossible: earliest_possible,
                latestPossible: latest_possible,
                duration: parseInt(duration),
                maxPrice: max_price,
                oceanview: oceanview
            };

            // API request to get all information from the server
            fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/hotels/offersOfHotelFiltered/${hotel_id}`, {
                method: "POST",
                body: JSON.stringify(filteredRequest),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setOffers(data);
                })
                .catch(e => console.log(e));
        }
    }, [count_adults, count_children, duration, latest_possible, earliest_possible, hotel_id, allResults]);

    document.title = (validRequest ? hotel.hotelName : "Invalid Request") + " | Mallorca24";

    console.log(hotel)

    return (
        <div>

            {!validRequest && (<InvalidRequest />)}
            {validRequest &&
                (<div style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "max(80vw, 900px)", marginTop: "15px", marginBottom: "15px", fontSize: "20px", textAlign: "left" }}><a href='/' style={{ color: "black", textDecoration: "none" }}><b>Overview</b></a> &gt; {!allResults && (<a href='' style={{ textDecoration: "none", color: "black" }}><b>Search results</b> &gt;</a>)} {hotel.hotelName}</div>
                    </div>

                    <Banner img={hotel.image} name={hotel.hotelName} stars={hotel.hotelStars} />
                    <div style={{ marginTop: "30px", fontSize: "20px" }}>On Mallorca24 <b><u>{amountBookings}</u></b> offers of this hotel have already been booked!</div>
                    <HotelCharacteristicsIcons has_pool={hotel.hasPool} free_wifi={hotel.freeWifi} pets_allowed={hotel.petsAllowed} />

                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <div style={{ width: "80vw", marginTop: "30px" }}>
                            <p><b>Description: </b>Welcome to our hotel in Mallorca, a luxurious and modern retreat located on the beautiful island of Mallorca. With stunning views of the Mediterranean Sea and surrounded by lush greenery, our hotel offers the perfect escape for those seeking relaxation and tranquility.
                                Our spacious and elegant rooms and suites are designed with your comfort in mind, featuring plush bedding, modern amenities, and private balconies or terraces with breathtaking views. Whether you're traveling for business or pleasure, our hotel offers everything you need to unwind and rejuvenate, including an outdoor pool, spa, and fitness center.
                                Indulge in delicious cuisine at our on-site restaurant, which offers a variety of dishes using fresh, locally sourced ingredients. And for those looking to explore the island, our hotel is ideally located near many popular attractions, including beautiful beaches, historic landmarks, and charming villages.
                                Experience the ultimate in luxury and relaxation at our hotel in Mallorca. We look forward to welcoming you soon.</p>
                        </div>
                        <LocationComp hotel={hotel} />
                    </div>


                    <div style={{ paddingTop: "30px", textAlign: "center", fontSize: "30px" }} id='offers' ref={offersRef}> {allResults ? <>All offers</> : <>Filtered offers</>} ({offers.length} results):</div>
                    <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", justifyContent: "center" }}>
                        {offers.length === 0 && (
                            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        )}
                        {offers.length > 0 && (
                            <OffersOfHotel offers={offers.slice(20 * (site - 1), min(20 * site, offers.length))} />
                        )
                        }
                    </div>
                    <SiteOrganizer setSite={setSite} site={site} amountSites={Math.ceil(offers.length / 20)} scrollRef={offersRef} />
                    <MapSection />
                </div>
                )}
        </div>
    );
}

export default HotelResultPage;
