package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.OffersOfHotel;
import de.florian.mallorcaservice.requests.FilteredRequest;
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

    @GetMapping(value = "/offersOfHotelFiltered/{id}")
    public ResponseEntity<OffersOfHotel> getOffersFiltered(@RequestBody FilteredRequest filters, @PathVariable("id") Long hotelId) {
        return ResponseEntity.ok(hotelService.getOffersOfHotelFiltered(filters, hotelId));
    }

    @GetMapping(value = "/offersOfHotel/{id}")
    public ResponseEntity<OffersOfHotel> getOffers(@PathVariable("id") Long hotelId) {
        return ResponseEntity.ok(hotelService.getOffersOfHotel(hotelId));
    }

    @GetMapping(value = "/suggestions")
    public ResponseEntity<List<Hotel>> getSuggestions() {
        return ResponseEntity.ok(hotelService.getCurrentSuggestions());
    }
}
