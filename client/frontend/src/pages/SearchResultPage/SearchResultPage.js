import SearchForm from "../../components/search/SearchForm";
import { useEffect, useRef, useState } from "react";
import InvalidRequest from "../../components/general/InvalidRequest";
import SearchResults, { SearchResultsPlaceholder } from "../../components/search/SearchResults";
import SiteOrganizer from "../../components/general/SiteOrganizer";
import NoResultsFound from "../../components/general/NoResultsFound";
import { min } from "../../components/general/Math";
import { Dropdown, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const SearchResultPage = () => {

    const [invalidRequest, setValidRequest] = useState(false);
    const [resultsLoaded, setResultsLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [sortMethod, setSortMethod] = useState(undefined);

    const [site, setSite] = useState(1);
    const resultsRef = useRef(null);

    const queryParams = new URLSearchParams(window.location.search);

    const currentDate = new Date();
    currentDate.setHours(1);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

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

    //arrays
    const roomtypes = queryParams.getAll("roomtypes");
    const departure_airports = queryParams.getAll("departure_airports");
    const mealtypes = queryParams.getAll("mealtypes");


    document.title = "Search Results | Mallorca24";

    const sortRelevance = () => {
        setResults((prevResults) =>
            [...prevResults].sort((a, b) => b.relevance - a.relevance)
        );
        setSite(1);
        setSortMethod("relevance");
    };

    const sortMinPrice = () => {
        setResults((prevResults) =>
            [...prevResults].sort((a, b) => a.minPrice - b.minPrice)
        );
        setSite(1);
        setSortMethod("minPrice");
    };

    const sortMaxPrice = () => {
        setResults((prevResults) =>
            [...prevResults].sort((a, b) => b.minPrice - a.minPrice)
        );
        setSite(1);
        setSortMethod("maxPrice");
    };

    const relevanceTooltip = (
        <Tooltip id="relevance-tooltip">
            Sort by relevance based on hotel stars, clicks and booking rate
        </Tooltip>
    );


    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (count_adults === undefined || count_children === undefined || duration === undefined || latest_possible === undefined || earliest_possible === undefined) {
            setValidRequest(true);
        }
        else {
            const filteredRequest = {
                filter: (roomtypes && roomtypes.length > 0 ? ["ROOMTYPE"] : [])
                    .concat(oceanview !== undefined && oceanview !== null ? ["OCEANVIEW"] : [])
                    .concat((mealtypes && mealtypes && mealtypes.length > 0 ? ["MEALTYPE"] : []))
                    .concat(max_price !== undefined && max_price !== null ? ["PRICE"] : [])
                    .concat((departure_airports && departure_airports.length > 0 ? ["AIRPORT"] : []))
                    .concat(has_pool !== undefined && has_pool !== null ? ["POOL"] : [])
                    .concat(min_stars !== undefined && min_stars !== null ? ["STARS"] : []),
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
            fetch(`http://jvxmbw4l428q734z.myfritz.net:8080/offers/offersFiltered`, {
                method: "POST",
                body: JSON.stringify(filteredRequest),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setResults(data);
                    sortRelevance();
                    setResultsLoaded(true);
                })
                .catch(
                    setValidRequest(false)
                );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {invalidRequest && <InvalidRequest />}
            {!invalidRequest && (

                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "min(600px, 100vw)" }}>
                        <SearchForm label={"Your search"} adults={count_adults} children={count_children} duration={duration} earliest_possible={earliest_possible} latest_possible={latest_possible} has_pool={has_pool} oceanview={oceanview} max_price={max_price} min_stars={min_stars} roomtypes={roomtypes} mealtypes={mealtypes} departure_airports={departure_airports} setResultsLoaded={setResultsLoaded} />
                    </div>
                    <div style={{ width: "calc(100vw - 1000px)", minWidth: "min(700px, 100vw)", display: "flex", justifyContent: "center", marginLeft: "100px", marginRight: "100px" }} ref={resultsRef}>
                        <div style={{ width: "80%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                            <div style={{ fontSize: "40px" }} >
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "calc(100% - 150px)", textAlign: "left" }}>
                                        <b>Search results:</b>
                                        {resultsLoaded ? (" " + results.length + " found") : (
                                            <Spinner animation="border" role="status" style={{ marginLeft: "15px", borderWidth: "3px" }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                    </div>

                                    {/*dropdown for sorting*/}
                                    <div style={{ display: "flex", justifyContent: "end", width: "150px", alignItems: "end" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" style={{ borderRadius: "0px", width: "100px" }}>
                                                Sort by
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{ borderRadius: "0px" }}>
                                                <Dropdown.Item onClick={() => sortRelevance()} style={{ textDecoration: sortMethod === "relevance" ? "underline" : "none" }}>relevance
                                                    <OverlayTrigger placement="right" overlay={relevanceTooltip}>
                                                        <FontAwesomeIcon
                                                            icon={faInfoCircle}
                                                            style={{ marginLeft: "10px", cursor: "pointer" }}
                                                        />
                                                    </OverlayTrigger></Dropdown.Item>
                                                <Dropdown.Item onClick={() => sortMinPrice()} style={{ textDecoration: sortMethod === "minPrice" ? "underline" : "none" }}>min. price</Dropdown.Item>
                                                <Dropdown.Item onClick={() => sortMaxPrice()} style={{ textDecoration: sortMethod === "maxPrice" ? "underline" : "none" }}>max. price</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                {(resultsLoaded &&
                                    results.length > 0 &&
                                    (<div>
                                        <SearchResults results={results.slice(20 * (site - 1), min(20 * site, results.length))} queryParams={queryParams.toString()} />
                                        <div style={{ marginTop: "15px" }}>
                                            <SiteOrganizer setSite={setSite} site={site} amountSites={Math.ceil(results.length / 20)} scrollRef={resultsRef} />
                                        </div>
                                    </div>
                                    )

                                )
                                    || (resultsLoaded && results.length === 0 && <NoResultsFound msg={new Date(earliest_possible) < currentDate ? "You want to start your trip in the past?" : latest_possible < earliest_possible ? "You want to return even before starting your trip?" : undefined} />)
                                }
                                {!resultsLoaded && (
                                    <div>
                                        <SearchResultsPlaceholder />
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
};

export default SearchResultPage;