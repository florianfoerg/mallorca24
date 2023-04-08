import React from "react";
import { Card } from "react-bootstrap";
import { LazyLoadComponent, trackWindowScroll } from "react-lazy-load-image-component";



const OffersOfHotel = ({ offers, scrollPosition }) => {
    console.log(offers)
    return (

        <div>
            {offers.map((o, i) => {
                return (
                    <React.Fragment key={i}>
                        <LazyLoadComponent
                            scrollPosition={scrollPosition}
                            style={{ height: "50px", width: "300px"}}
                        >
                            <Card style={{ height: "50px", width: "300px", marginLeft:"auto", marginRight: "auto", borderRadius: "0", marginTop:"15px" }}>
                                <Card.Title>{o.price}</Card.Title>
                            </Card>
                        </LazyLoadComponent>
                    </React.Fragment>
                )
            })}

        </div>

    );
}

export default trackWindowScroll(OffersOfHotel);