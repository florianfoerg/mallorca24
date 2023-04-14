package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.offers.model.*;
import de.florian.mallorcaservice.requests.FilteredRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/offers")
public class OfferController {

    private OfferRepository offerRepository;
    private OfferService offerService;

    /* only for debugging because of the huge amount of resulting data */
    @Deprecated
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
        offerRepository.deleteById(offerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/offer/{id}")
    public ResponseEntity<Offer> getOffer(@PathVariable("id") Long offerId) {
        return ResponseEntity.ok(offerRepository.findById(offerId).orElse(null));
    }

    @PostMapping(value = "/offersFiltered")
    public ResponseEntity<List<HotelOverviewDTO>> getFilteredOffers(@RequestBody FilteredRequest filters) {
        System.out.println(filters);
        return ResponseEntity.ok(offerService.getOffersFiltered(filters));
    }

    @GetMapping(value = "/validate/{offer_id}")
    public ResponseEntity<Void> validateOffer(@PathVariable("offer_id") Long offerId) {
            final Optional<Offer> offer = offerRepository.findById(offerId);

            if(offer.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().build();
    }
}
