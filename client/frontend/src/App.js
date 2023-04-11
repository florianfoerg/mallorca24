import { BrowserRouter, Route, Routes } from "react-router-dom";
import HotelOfferPage from "./pages/hotel-offer-page/HotelOfferPage";
import NavBar from "./components/general/NavBar";
import Footer from "./components/general/Footer";
import LandingPage from "./pages/landing-page/LandingPage";
import OfferOverviewPage from "./pages/offer-overview-page/OfferOverviewPage";
import ConfirmBookingPage from "./pages/confirm-booking-page/ConfirmBookingPage";
import BookingSuccessPage from "./pages/booking-success-page/BookingSuccessPage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>

        <Routes>
          <Route path="/hotels/hotel/:hotel_id" element = {<><HotelOfferPage /></>}></Route>
          <Route path="/offers/overview/:offer_id" element = {<><OfferOverviewPage /></>}></Route>
          <Route path="/offers/confirm-booking/:offer_id" element = {<><ConfirmBookingPage /></>}></Route>
          <Route path="/bookings/success/:booking_id" element = {<><BookingSuccessPage /></>}></Route>
          <Route path="/search" element = {<><SearchResultPage /></>}></Route>
          <Route path="/imprint" element = {<></>}></Route>
          <Route path="/about" element = {<></>}></Route>
          <Route path="/" element = {<><LandingPage /></>}></Route>
          <Route path="*" element={<LandingPage />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
