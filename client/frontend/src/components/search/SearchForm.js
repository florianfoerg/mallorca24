import './SearchForm.css'

import { useContext, useState } from 'react';
import { Accordion, AccordionContext, Button, Card, Form, useAccordionButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCalendar, faHouse, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons';

// easy way to map codes and names
const airports = [
    { name: 'Amsterdam', code: 'AMS' },
    { name: 'Basel/Mulhouse', code: 'BSL' },
    { name: 'Bremen', code: 'BRE' },
    { name: 'Berlin', code: 'BER' },
    { name: 'Bern', code: 'BRN' },
    { name: 'Billund', code: 'BLL' },
    { name: 'Brussels South Charleroi', code: 'CRL' },
    { name: 'Brussels', code: 'BRU' },
    { name: 'Cologne', code: 'CGN' },
    { name: 'Dortmund', code: 'DTM' },
    { name: 'Dresden', code: 'DRS' },
    { name: 'Düsseldorf', code: 'DUS' },
    { name: 'Eindhoven', code: 'EIN' },
    { name: 'Erfurt', code: 'ERF' },
    { name: 'Frankfurt', code: 'FRA' },
    { name: 'Friedrichshafen', code: 'FDH' },
    { name: 'Geneva', code: 'GVA' },
    { name: 'Graz', code: 'GRZ' },
    { name: 'Hahn', code: 'HHN' },
    { name: 'Hamburg', code: 'HAM' },
    { name: 'Hanover', code: 'HAJ' },
    { name: 'Innsbruck', code: 'INN' },
    { name: 'Klagenfurt', code: 'KLU' },
    { name: 'Kassel', code: 'KSF' },
    { name: 'Krakow', code: 'KRK' },
    { name: 'Karlsruhe/Baden-Baden', code: 'FKB' },
    { name: 'Leipzig', code: 'LEJ' },
    { name: 'Linz', code: 'LNZ' },
    { name: 'Lübeck', code: 'LBC' },
    { name: 'Luxembourg', code: 'LUX' },
    { name: 'Magdeburg Cochstedt', code: 'CSO' },
    { name: 'Memmingen', code: 'FMM' },
    { name: 'Munich', code: 'MUC' },
    { name: 'Münster', code: 'FMO' },
    { name: 'Nuremberg', code: 'NUE' },
    { name: 'Paderborn', code: 'PAD' },
    { name: 'Prague', code: 'PRG' },
    { name: 'Rostock-Laage', code: 'RLG' },
    { name: "Rotterdam", code: "RTM" },
    { name: 'Saarbrücken', code: 'SCN' },
    { name: 'Salzburg', code: 'SZG' },
    { name: 'Strasbourg', code: 'SXB' },
    { name: 'Stuttgart', code: 'STR' },
    { name: 'Sylt', code: 'GWT' },
    { name: 'Vienna', code: 'VIE' },
    { name: 'Warsaw', code: 'WAW' },
    { name: 'Weeze', code: 'NRN' },
    { name: 'Zürich', code: 'ZRH' }
];


const mealTypes = [
    { code: 'ACCORDINGDESCRIPTION', name: 'According to Description' },
    { code: 'ALLINCLUSIVE', name: 'All Inclusive' },
    { code: 'ALLINCLUSIVEPLUS', name: 'All Inclusive Plus' },
    { code: 'BREAKFAST', name: 'Breakfast' },
    { code: 'FULLBOARD', name: 'Full Board' },
    { code: 'FULLBOARDPLUS', name: 'Full Board Plus' },
    { code: 'HALFBOARD', name: 'Half Board' },
    { code: 'HALFBOARDPLUS', name: 'Half Board Plus' },
    { code: 'NONE', name: 'None' },
    {code: 'PROGRAM', name: 'Program'}
];

const roomTypes = [
    { code: 'ACCORDINGDESCRIPTION', name: 'According to Description' },
    { code: 'APARTMENT', name: 'Apartment' },
    { code: 'BUNGALOW', name: 'Bungalow' },
    { code: 'DELUXE', name: 'Deluxe' },
    { code: 'DOUBLE', name: 'Double' },
    { code: 'DUPLEX', name: 'Duplex' },
    { code: 'ECONOMY', name: 'Economy' },
    { code: 'FAMILY', name: 'Family' },
    { code: 'FOURBEDROOM', name: 'Four-Bedroom' },
    { code: 'HOLIDAYHOUSE', name: 'Holiday House' },
    { code: 'JUNIORSUITE', name: 'Junior Suite' },
    { code: 'MULTISHARE', name: 'Multi-Share' },
    { code: 'SINGLE', name: 'Single' },
    { code: 'STUDIO', name: 'Studio' },
    { code: 'SUPERIOR', name: 'Superior' },
    { code: 'TRIPLE', name: 'Triple' },
    { code: 'TWINROOM', name: 'Twin Room' },
    { code: 'VILLA', name: 'Villa' },
];


// component to turn advanced search on/off
function ContextAwareToggle({ eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const clickHandler = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Button
            style={{ backgroundColor: "transparent", color: "white", borderWidth: "0", textDecoration: isCurrentEventKey ? "underline" : "none" }}
            onClick={clickHandler}
        >
            Advanced Search <FontAwesomeIcon icon={isCurrentEventKey ? faArrowUp : faArrowDown} />
        </Button>
    );
}


// component to display the search form
const SearchForm = ({ adults, children, label, duration, earliest_possible, latest_possible, has_pool, oceanview, max_price, min_stars, roomtypes, mealtypes, departure_airports, setResultsLoaded }) => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(earliest_possible);
    const [endDate, setEndDate] = useState(latest_possible);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const inputs = form.querySelectorAll('input, select');

        // Convert form data to URLSearchParams object
        const params = new URLSearchParams();
        inputs.forEach((input) => {
            if (input.name && input.value !== "Not choosen" && input.value !== "") {
                if (input.nodeName === "SELECT" && input.multiple) {
                    for (let i = 0; i < input.selectedOptions.length; i++) {
                        params.append(input.name, input.selectedOptions[i].value);
                    }
                } else {
                    params.append(input.name, input.value);
                }
            }
        });


        if (setResultsLoaded !== undefined) {
            setResultsLoaded(false)
        }

        navigate(`/search?${params.toString()}`);
        window.location.reload();

    };




    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

            <div className="search-form">
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ fontSize: "25px" }}><b>{label}</b></Form.Label>
                    </Form.Group>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Form.Group style={{ width: "100%" }}>
                            <Form.Label style={{ fontSize: "20px", textAlign: "left", display: "flex", width: "100%" }}><b>Who is travelling? <FontAwesomeIcon icon={faPerson} /></b></Form.Label>

                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Adults</Form.Label>
                                    <Form.Control type="number" style={{ borderRadius: "0", minWidth: "250px" }} defaultValue={adults} min={1} name='count_adults' />
                                </Form.Group>

                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Children</Form.Label>
                                    <Form.Control type="number" style={{ borderRadius: "0", minWidth: "250px" }} defaultValue={children} min={0} name='count_children' />
                                </Form.Group>
                            </div>
                        </Form.Group>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "15px" }}>
                        <Form.Group style={{ width: "100%" }}>
                            <Form.Label style={{ fontSize: "20px", textAlign: "left", display: "flex", width: "100%" }}><b>When do you want to travel? <FontAwesomeIcon icon={faCalendar} /></b></Form.Label>

                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Earliest start date</Form.Label>
                                    <Form.Control type="date" style={{ borderRadius: "0", minWidth: "250px" }} required={true} placeholder={"Enter a date"} name='earliest_possible' defaultValue={earliest_possible} min={new Date().toISOString().split('T')[0]} onChange={e => setStartDate(e.target.value)}/>
                                </Form.Group>

                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Latest end date</Form.Label>
                                    <Form.Control type="date" style={{ borderRadius: "0", minWidth: "250px" }} required={true} placeholder={"Enter a date"} name='latest_possible' defaultValue={latest_possible} min={startDate === undefined ? undefined : startDate} disabled={startDate === undefined} onChange={e => setEndDate(e.target.value)} />
                                </Form.Group>

                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Duration in days</Form.Label>
                                    <Form.Control type="number" style={{ borderRadius: "0", minWidth: "250px" }} placeholder='Enter a duration' min={1} required={true} name='duration' defaultValue={duration} disabled={endDate === undefined} max={endDate === undefined ? 1 : 1 + (Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))}/>
                                </Form.Group>
                            </div>
                        </Form.Group>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "15px" }}>
                        <Form.Group style={{ width: "100%" }}>
                            <Form.Label style={{ fontSize: "20px", textAlign: "left", display: "flex", width: "100%" }}><b>Where do you want to travel from? <FontAwesomeIcon icon={faPlane} /></b> </Form.Label>

                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                                <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                    <Form.Label>Airports your trip can start from</Form.Label>
                                    <Form.Select multiple={true} style={{ borderRadius: "0", minWidth: "250px" }} name='departure_airports' defaultValue={departure_airports} required={true}>
                                        {airports.map((airport, index) => {
                                            return <option key={index} value={airport.code}>{airport.name}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>

                            </div>
                        </Form.Group>
                    </div>

                    {/* advanced search */}
                    <Accordion defaultActiveKey="0">
                        <Card style={{ backgroundColor: "transparent", borderWidth: "0", marginTop: "30px" }}>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <Card.Header style={{ backgroundColor: "transparent", borderWidth: "0", borderBottomWidth: "1px", borderColor: "white", width: "100%", display: "flex", justifyContent: "center" }}>
                                    <ContextAwareToggle eventKey="1" />
                                </Card.Header>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "15px" }}>
                                <Accordion.Collapse eventKey="1" style={{ width: "100%" }}>

                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "15px" }}>
                                            <Form.Group style={{ width: "100%" }}>
                                                <Form.Label style={{ fontSize: "20px", textAlign: "left", display: "flex", width: "100%" }}><b>What about other wishes?* <FontAwesomeIcon icon={faHouse} /></b></Form.Label>

                                                <div style={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Swimming pool</Form.Label>
                                                        <Form.Select style={{ borderRadius: "0", minWidth: "250px" }} name='has_pool' defaultValue={has_pool}>
                                                            <option>Not choosen</option>
                                                            <option value={true}>Swimming pool in hotel</option>
                                                            <option value={false}>No swimming pool in hotel</option>
                                                        </Form.Select>
                                                    </Form.Group>


                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Oceanview</Form.Label>
                                                        <Form.Select style={{ borderRadius: "0", minWidth: "250px" }} name='oceanview' defaultValue={oceanview}>
                                                            <option>Not choosen</option>
                                                            <option value={true}>Room with oceanview</option>
                                                            <option value={false}>Room without oceanview</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Minimum hotel stars</Form.Label>
                                                        <Form.Select style={{ borderRadius: "0", minWidth: "250px" }} name='min_stars' defaultValue={min_stars}>
                                                            <option>Not choosen</option>
                                                            <option value={1}>One</option>
                                                            <option value={2}>Two</option>
                                                            <option value={3}>Three</option>
                                                            <option value={4}>Four</option>
                                                            <option value={5}>Fife</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    {/* max price as double */}
                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Maximum price</Form.Label>
                                                        <Form.Control type="number" style={{ borderRadius: "0", minWidth: "250px" }} placeholder='Enter a price' min={1} step="0.01" name='max_price' defaultValue={max_price} />
                                                    </Form.Group>



                                                </div>

                                                <div style={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap", marginTop: "15px" }}>

                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Mealtypes</Form.Label>
                                                        <Form.Select multiple={true} style={{ borderRadius: "0", minWidth: "250px" }} name='mealtypes' defaultValue={mealtypes}>
                                                            {mealTypes.map((mealtype, index) => {
                                                                return <option key={index} value={mealtype.code}>{mealtype.name}</option>
                                                            })}
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Form.Label>Roomtypes</Form.Label>
                                                        <Form.Select multiple={true} style={{ borderRadius: "0", minWidth: "250px" }} name='roomtypes' defaultValue={roomtypes}>
                                                            {roomTypes.map((roomtype, index) => {
                                                                return <option key={index} value={roomtype.code}>{roomtype.name}</option>
                                                            })}
                                                        </Form.Select>
                                                    </Form.Group>

                                                </div>


                                            </Form.Group>
                                        </div>
                                        <div style={{ marginTop: "15px" }}>
                                            *optional
                                        </div>

                                    </div>


                                </Accordion.Collapse>
                            </div>



                        </Card>
                    </Accordion>




                    <div style={{ marginTop: "15px", display: "flex", justifyContent: "end", width: "100%" }}>
                        <Button variant="outline-light" title='Search' type="submit" style={{ borderRadius: "0" }}>
                            Search
                        </Button>
                    </div>
                </Form>

            </div>
        </div>

    )
}

export default SearchForm