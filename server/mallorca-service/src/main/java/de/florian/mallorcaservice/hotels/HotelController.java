package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.OfferService;
import de.florian.mallorcaservice.offers.model.Offer;
import de.florian.mallorcaservice.requests.FilteredRequestOffers;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/hotels")
public class HotelController {

    private HotelRepository hotelRepository;
    private HotelService hotelService;
    private OfferService offerService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return ResponseEntity.ok(hotels);
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Void> addNewHotel(@RequestBody Hotel hotel) {
        hotelRepository.save(hotel);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/offersOfHotel")
    public ResponseEntity<List<Offer>> getOffers(@RequestBody FilteredRequestOffers filters) {
        return ResponseEntity.ok(offerService.getOffersOfHotel(filters));
    }
}
