import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import HotelOfferPage from "./pages/HotelOfferPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/hotel-offers/:hotel_id" element = {<><HotelOfferPage /></>}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
