package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.offers.model.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/offers")
public class OfferController {

    private OfferRepository offerRepository;
    private OfferService offerService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Offer>> getAllCustomers() {
        List<Offer> hotels = offerRepository.findAll();
        return ResponseEntity.ok(hotels);
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Void> addNewCustomer(@RequestBody Integer countAdults,
                                               @RequestBody Integer countChildren,
                                               @RequestBody LocalDateTime inboundDepartureDateTime,
                                               @RequestBody LocalDateTime inboundArrivalDateTime,
                                               @RequestBody Double price,
                                               @RequestBody Long hotelId,
                                               @RequestBody Airport outboundDepartureAirport,
                                               @RequestBody Airport inboundDepartureAirport,
                                               @RequestBody Mealtype mealtype,
                                               @RequestBody Boolean oceanview,
                                               @RequestBody Roomtype roomtype
    ) {

        offerService.createNewOffer(countAdults, countChildren, inboundDepartureDateTime, inboundArrivalDateTime, price, hotelId, outboundDepartureAirport, inboundDepartureAirport, mealtype, oceanview, roomtype);

        return ResponseEntity.ok().build();
    }
}
