import HotelRecommendations from '../../components/landing/HotelRecommendations';
import SearchForm from '../../components/search/SearchForm';
import './LandingPage.css'

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

            {/* section for hotel recommendations */}
            <HotelRecommendations />
        </div>
    );
}

export default LandingPage;
