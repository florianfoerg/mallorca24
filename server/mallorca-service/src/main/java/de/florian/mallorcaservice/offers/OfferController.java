package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.offers.model.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/offers")
public class OfferController {

    private OfferRepository offerRepository;
    private OfferService offerService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerRepository.findAll();
        return ResponseEntity.ok(offers);
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Void> createNewOffer(@RequestBody Offer offer, @RequestParam Long hotelId) {
        offerService.createNewOffer(offer, hotelId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/offer/{id}")
    public ResponseEntity<Void> removeOffer(@PathVariable("id") Long offerId) {
        offerRepository.deleteAllById(Collections.singleton(offerId));
        return ResponseEntity.ok().build();
    }
}
