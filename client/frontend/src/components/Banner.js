import { Button } from 'react-bootstrap';
import './Banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


function Banner({ imgSrc, name }) {
    console.log(`url(${imgSrc})`);

    return (<div style={{ justifyContent: "center", display: "flex" }}>
        <header className="banner" style={{ backgroundImage: `url(${imgSrc})` }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                <div style={{ fontSize: "30px", alignSelf: "center" }}>-Hotel-</div>
                <div style={{ fontSize: "55px", alignSelf: "center" }}>{name}</div>
                <Button variant="outline-light" title='Scroll' style={{ maxWidth: "200px", marginTop: "3%", borderRadius: "0" }}>Show offers <FontAwesomeIcon icon={faArrowDown} /></Button>
            </div>
        </header>
    </div>
    );
}

export default Banner;