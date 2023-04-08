import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <video className="header-video" src="https://vod-progressive.akamaized.net/exp=1680979035~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4867%2F22%2F574339250%2F2713502905.mp4~hmac=6a2678ec66fb1dbfec14bd50170952a985f092db04973df975efb4a3034fefa3/vimeo-prod-skyfire-std-us/01/4867/22/574339250/2713502905.mp4" autoPlay loop muted playsInline>
            </video>
            <div className="heading-container">
                <div className="heading">
                    <img src='https://i.imgur.com/iHBrzXW.png' style={{width: "min(50vw,400px)"}} alt='Mallorca transparent'></img>
                    <h1 style={{maxWidth: "400px"}}>Find your perfect Mallorca trip</h1>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
