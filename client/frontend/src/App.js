import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import HotelOfferPage from "./pages/hotel-offer-page/HotelOfferPage";
import NavBar from "./components/general/NavBar";
import Footer from "./components/general/Footer";
import LandingPage from "./pages/landing-page/LandingPage";
import OfferOverviewPage from "./pages/offer-overview-page/OfferOverviewPage";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>

        <Routes>
          <Route path="/hotels/hotel/:hotel_id" element = {<><HotelOfferPage /></>}></Route>
          <Route path="/offers/overview/:offer_id" element = {<><OfferOverviewPage /></>}></Route>
          <Route path="/" element = {<><LandingPage /></>}></Route>
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
