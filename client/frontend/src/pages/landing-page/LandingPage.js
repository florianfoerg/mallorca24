import './LandingPage.css'

import { Button } from 'react-bootstrap';
import HotelRecommendations from '../../components/landing/HotelRecommendations';
import SearchForm from '../../components/search/SearchForm';
import MallorcaInfoBox from '../../components/landing/MallorcaInfoBox';

const LandingPage = () => {
    return (
        // main container for the landing page
        <div className="landing-page">
            {/* header video */}
            <video className="header-video" src="https://i.imgur.com/NGSsnWi.mp4" autoPlay loop muted playsInline>
            </video>
            <div className="heading-container">
                <div className="heading">
                    {/* logo */}
                    <img src='https://i.imgur.com/i1EZqwL.png' style={{ width: "min(50vw,400px)" }} alt='Mallorca transparent'></img>
                    {/* heading text */}
                    <h1 style={{ maxWidth: "400px" }}>Find your perfect Mallorca trip</h1>
                </div>
            </div>

            <div style={{textAlign: "center", marginTop: "30px", fontSize: "25px", marginLeft: "50px", marginRight: "50px"}}>
                Compare more than <b>100 million offers</b> from different hotels and book your trip in just a few clicks!
            </div>

            {/* section for search form */}
            <SearchForm adults={1} children={0} label={"Find your trip"}/>

            <MallorcaInfoBox />

            <div style={{width: "100%", background: "#005ea8", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "60px",}}>
                <Button href='/about' variant="outline-light" style={{ borderRadius: "0", width: "200px"}}>Learn more about the project</Button>
            </div>

            {/* section for hotel recommendations */}
            <HotelRecommendations />
        </div>
    );
}

export default LandingPage;
