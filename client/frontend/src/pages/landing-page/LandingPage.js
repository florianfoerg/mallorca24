import HotelRecommendations from '../../components/HotelRecommendations';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <video className="header-video" src="https://i.imgur.com/NGSsnWi.mp4" autoPlay loop muted playsInline>
            </video>
            <div className="heading-container">
                <div className="heading">
                    <img src='https://i.imgur.com/i1EZqwL.png' style={{width: "min(50vw,400px)"}} alt='Mallorca transparent'></img>
                    <h1 style={{maxWidth: "400px"}}>Find your perfect Mallorca trip</h1>
                </div>
            </div>
            <HotelRecommendations />
        </div>
    );
}

export default LandingPage;
