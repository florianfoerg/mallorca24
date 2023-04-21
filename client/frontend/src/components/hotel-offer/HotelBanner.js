import './HotelBanner.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Rating } from 'react-simple-star-rating';

function HotelBanner({ img, name, stars }) {
  // Render the banner with the provided image, name, and star rating
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <header className="banner" style={{ backgroundImage: `url(${img})` }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
          {/* Display the hotel name */}
          <div style={{ fontSize: "30px", alignSelf: "center" }}>-Hotel-</div>
          <div style={{ fontSize: "55px", alignSelf: "center" }}>{name}</div>
          {/* Display the star rating */}
          <Rating initialValue={stars} size={60} readonly />
          {/* Button to scroll to offers section */}
          <Button variant="outline-light" title='Scroll' style={{ maxWidth: "200px", marginTop: "3%", borderRadius: "0" }} href='#offers'>
            Show offers <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </div>
      </header>
    </div>
  );
}

export default HotelBanner;
