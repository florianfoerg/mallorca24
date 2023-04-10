import React from 'react';
import './LocationComp.css';

import MapSection from './MapSection'; // import MapSection component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // import fontawesome icons
import { faUmbrellaBeach, faCity, faPlane, faCheck } from '@fortawesome/free-solid-svg-icons'; // import required fontawesome icons

// functional component LocationComp takes props `hotel`
const LocationComp = ({ hotel }) => {
  
  return (
    <div className="location-comp">
      <div className="map-section">
        <MapSection name={hotel.hotelName} marker={hotel.marker} />
      </div>
      <div className="info-section">
        <div className="info-item"> 
          <FontAwesomeIcon icon={faUmbrellaBeach} /> <b>{hotel.distanceNextBeach}m</b> to the next beach!
          {hotel.distanceNextBeach < 2000 && <div><FontAwesomeIcon icon={faCheck} style={{color: "#21ba73"}} /> Close</div>}
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faCity} /> <b>{hotel.distanceCentre}m</b> to the city centre!
          {hotel.distanceCentre < 4000 && <div><FontAwesomeIcon icon={faCheck} style={{color: "#21ba73"}} /> Close</div>}
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faPlane} /> <b>{hotel.distanceNextAirport}km</b> to the next airport!
          {hotel.distanceNextAirport < 20 && <div><FontAwesomeIcon icon={faCheck} style={{color: "#21ba73"}} /> Close</div>}
        </div>
      </div>
    </div>
  );
};

export default LocationComp;
