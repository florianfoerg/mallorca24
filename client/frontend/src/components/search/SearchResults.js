import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component'
import { Button, Card, Placeholder } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { faCity, faDog, faPersonSwimming, faPlane, faUmbrellaBeach, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchResultCard = ({ result, queryParams }) => {

    return (
        <Card className="hotel-overview-card" style={{ borderRadius: "0", width: "max(320px, 50vw)" }}>
            <Card.Header as="h5" style={{ display: "flex" }}>
                <div style={{ textAlign: "left", width: "50%" }} >
                    <a href={"/hotels/hotel/" + result.hotelId} style={{ textDecoration: "none", color: "black" }}><b>{result.hotelName}</b></a>
                </div>
                <div style={{ textAlign: "right", width: "50%" }} >
                    <Rating initialValue={result.hotelStars} readonly="true" size={30} fillColor="#063773" />
                </div>
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                    <div style={{ fontSize: "20px", width: "max(50%, 250px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={result.image} style={{ width: "100%" }} alt={"hotel"}></img>
                    </div>

                    <div style={{ fontSize: "20px", width: "max(50%, 250px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ padding: "20px" }}>
                            {result.closeToBeach && (<div><FontAwesomeIcon icon={faUmbrellaBeach} style={{ color: "#063773", }} /> Close to the beach</div>)}
                            {result.closeToCentre && (<div><FontAwesomeIcon icon={faCity} style={{ color: "#063773", }} /> Close to the centre</div>)}
                            {result.closeToAirport && (<div><FontAwesomeIcon icon={faPlane} style={{ color: "#063773", }} /> Close to the airport</div>)}
                            {result.hasPool && (<div><FontAwesomeIcon icon={faPersonSwimming} style={{ color: "#063773", }} /> Swimming pool</div>)}
                            {result.petsAllowed && (<div><FontAwesomeIcon icon={faDog} style={{ color: "#063773", }} /> Pets allowed</div>)}
                            {result.freeWifi && (<div><FontAwesomeIcon icon={faWifi} style={{ color: "#063773", }} /> Free WIFI</div>)}
                        </div>
                    </div>

                </div>


                <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginTop: "15px" }}>
                    <div style={{ height: "100%", justifyContent: "center", fontSize: "23px", marginRight: "10px" }}>
                        min. <b>{result.minPrice}€</b>
                    </div>
                    <Button variant="outline-dark" style={{ borderRadius: "0", width: "150px" }} href={"/hotels/hotel/" + result.hotelId + "?" + queryParams}>Find offers</Button>
                </div>

            </Card.Body>
        </Card>
    )
}

const SearchResultPlaceholderCard = () => {

    return (
        <Card className="hotel-overview-card" style={{ borderRadius: "0", width: "max(320px, 50vw)" }}>
            <Placeholder as={Card.Header} animation="glow" style={{ display: "flex" }}>
                <div style={{ textAlign: "left", width: "50%" }} >
                    <Placeholder xs={6} />
                </div>
                <div style={{ textAlign: "right", width: "50%" }} >
                    <Placeholder xs={6} />
                </div>
            </Placeholder>
            <Card.Body>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                    <div style={{ fontSize: "20px", width: "max(50%, 250px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="https://cdn.wallpapersafari.com/58/0/XPkQR3.jpg" style={{ width: "100%" }} alt={"placeholder"}></img>
                    </div>

                    <div style={{ fontSize: "20px", width: "max(50%, 250px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ padding: "20px" }}>
                            <Placeholder as={Card.Text} animation='glow' style={{ display: "flex", marginRight: "30px" }}>
                                <Placeholder xs={6} style={{ marginLeft: "5px", height: "20px", width: "150px" }} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation='glow' style={{ display: "flex", marginRight: "30px" }}>
                                <Placeholder xs={6} style={{ marginLeft: "5px", height: "20px", width: "150px" }} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation='glow' style={{ display: "flex", marginRight: "30px" }}>
                                <Placeholder xs={6} style={{ marginLeft: "5px", height: "20px", width: "150px" }} />
                            </Placeholder>
                        </div>
                    </div>

                </div>


                <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginTop: "15px" }}>
                    <div style={{ height: "100%", justifyContent: "center", fontSize: "23px", marginRight: "10px" }}>
                        <Placeholder as={Card.Text} animation='glow' style={{ display: "flex", marginRight: "30px" }}>
                            min. <Placeholder xs={6} style={{ marginLeft: "5px" }} /> <b>€</b>
                        </Placeholder>
                    </div>
                    <Placeholder.Button variant="outline-dark" style={{ borderRadius: "0", width: "150px" }} />
                </div>

            </Card.Body>
        </Card>
    )
}

export const SearchResultsPlaceholder = () => {
    return (
        <div>
            {[...Array(10)].map((_, i) => {
                return (
                    <React.Fragment key={i}>
                        <SearchResultPlaceholderCard />
                    </React.Fragment>
                )
            })
            }
        </div>
    )
}

// maps search results to cards
const SearchResults = ({ results, queryParams, scrollPosition }) => {

    return (
        <div>
            {results.map((r, i) => {
                return (
                    <React.Fragment key={i}>
                        {/* LazyLoadComponent is used to only render the component when it is in the viewport */}
                        <LazyLoadComponent
                            scrollPosition={scrollPosition}
                            style={{ height: "350px", width: "40vw" }}
                        >
                            <SearchResultCard result={r} queryParams={queryParams} />
                        </LazyLoadComponent>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default trackWindowScroll(SearchResults);
