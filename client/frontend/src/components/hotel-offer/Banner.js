import { Button } from 'react-bootstrap';
import './Banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Rating } from 'react-simple-star-rating';


function Banner({ img, name, stars }) {

    return (<div style={{ justifyContent: "center", display: "flex" }}>
        <header className="banner" style={{ backgroundImage: `url(${img})` }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                <div style={{ fontSize: "30px", alignSelf: "center" }}>-Hotel-</div>
                <div style={{ fontSize: "55px", alignSelf: "center" }}>{name}</div>
                <Rating initialValue={stars} readonly="true" size={60} />
                <Button variant="outline-light" title='Scroll' style={{ maxWidth: "200px", marginTop: "3%", borderRadius: "0" }} href='#offers'>Show offers <FontAwesomeIcon icon={faArrowDown} /></Button>
            </div>
        </header>
    </div>
    );
}

export default Banner;