import { useEffect, useState } from 'react';
import './HotelRecommendations.css'
import { Button, Card } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

const HotelRecommendationCard = ({ name, img, stars, id, idx, has_pool, centre }) => {
    return (
        <Card style={{ width: '18rem', borderRadius: "0" }}>
            <Card.Img variant="top" src={img} style={{ borderRadius: "0" }} />
            <Card.Body>
                <div>{idx}.</div>
                <Card.Title style={{ marginTop: "10px" }}>
                    {name} <br />
                    <Rating initialValue={stars} readonly="true" size={30} fillColor="#063773" />
                </Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content. <br />
                </Card.Text>
                <Button variant="outline-dark" style={{ borderRadius: "0" }} href={'/hotels/hotel/' + id}>Find offers</Button>
            </Card.Body>
        </Card>
    );
}


const HotelRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        // API request to get current recommendations from server
        fetch(`http://localhost:8080/hotels/suggestions`)
            .then(response => response.json())
            .then(data => {
                setRecommendations(data)

                console.log(data)
            })
            .catch(() => {
                console.log("uhsdchuas")
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
                            <div key={i} style={{ flexBasis: "33%", marginTop: "30px", justifyContent: "center", display: "flex"}}>
                                <HotelRecommendationCard
                                    name={r.hotelName}
                                    img={r.image}
                                    stars={r.hotelStars}
                                    idx={i + 1}
                                    id={r.hotelId}
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