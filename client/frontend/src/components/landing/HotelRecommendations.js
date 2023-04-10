import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { faCity, faDog, faPersonSwimming, faPlane, faUmbrellaBeach, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HotelRecommendationCard = ({ name, img, stars, id, idx, has_pool, close_to_centre, close_to_beach, pets_allowed, free_wifi, close_to_airport }) => {
    return (
        <Card style={{ width: '18rem', borderRadius: "0", boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}>
            <Card.Img variant="top" src={img} style={{ borderRadius: "0", height: "200px" }} alt={'image '+ name} />
            <Card.Body>
                <div>{idx}.</div>
                <Card.Title style={{ marginTop: "10px" }}>
                    {name} <br />
                    <Rating initialValue={stars} readonly="true" size={30} fillColor="#063773" />
                </Card.Title>
                <div style={{ padding: "20px" }}>
                    {close_to_beach && (<div><FontAwesomeIcon icon={faUmbrellaBeach} style={{ color: "#063773", }} /> Close to the beach</div>)}
                    {close_to_centre && (<div><FontAwesomeIcon icon={faCity} style={{ color: "#063773", }} /> Close to the centre</div>)}
                    {close_to_airport && (<div><FontAwesomeIcon icon={faPlane} style={{ color: "#063773", }} /> Close to the airport</div>)}
                    {has_pool && (<div><FontAwesomeIcon icon={faPersonSwimming} style={{ color: "#063773", }} /> Swimming pool</div>)}
                    {pets_allowed && (<div><FontAwesomeIcon icon={faDog} style={{ color: "#063773", }} /> Pets allowed</div>)}
                    {free_wifi && (<div><FontAwesomeIcon icon={faWifi} style={{ color: "#063773", }} /> Free WIFI</div>)}
                </div>


            </Card.Body>
            <div>
                <Button variant="outline-dark" style={{ borderRadius: "0", marginBottom: "20px", width: "150px" }} href={'/hotels/hotel/' + id}>Find offers</Button>
            </div>
        </Card>
    );
}


const HotelRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        // API request to get current recommendations from server
        fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/hotels/recommendations`)
            .then(response => response.json())
            .then(data => {
                setRecommendations(data)
            })
            .catch(() => {
            });
    }, []
    );


    return (
        <div style={{ marginTop: "30px", textAlign: "center", alignItems: "center" }}>
            <h1>Today's recommendations:</h1>
            <div style={{ marginTop: "30px" }}>
                {recommendations.length === 0 && (
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "max(50px, 15vw)", marginRight: "max(50px,15vw)", justifyContent: "center" }}>
                    {recommendations.length > 0 && (
                        recommendations.map((r, i) => (
                            <div key={i} style={{ flexBasis: "33%", marginTop: "30px", justifyContent: "center", display: "flex" }}>
                                <HotelRecommendationCard
                                    name={r.hotelName}
                                    img={r.image}
                                    stars={r.hotelStars}
                                    idx={i + 1}
                                    id={r.hotelId}
                                    has_pool={r.hasPool}
                                    free_wifi={r.freeWifi}
                                    close_to_beach={r.closeToBeach}
                                    close_to_centre={r.closeToCentre}
                                    close_to_airport={r.closeToAirport}
                                    pets_allowed={r.petsAllowed}
                                />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default HotelRecommendations;