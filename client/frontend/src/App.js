import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import HotelOfferPage from "./pages/HotelOfferPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>

        <Routes>
          <Route path="/hotels/hotel/:hotel_id" element = {<><HotelOfferPage /></>}></Route>
          <Route path="/" element = {<><LandingPage /></>}></Route>
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
