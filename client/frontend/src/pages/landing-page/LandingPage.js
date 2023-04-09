import HotelRecommendations from '../../components/landing/HotelRecommendations';
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
            {/* section for hotel recommendations */}
            <HotelRecommendations />
        </div>
    );
}

export default LandingPage;
