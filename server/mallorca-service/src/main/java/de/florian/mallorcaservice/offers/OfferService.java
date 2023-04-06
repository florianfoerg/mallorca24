package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.offers.model.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;

    public void createNewOffer(Integer countAdults,
                               Integer countChildren,
                               LocalDateTime inboundDepartureDateTime,
                               LocalDateTime inboundArrivalDateTime,
                               Double price,
                               Long hotelId,
                               Airport outboundDepartureAirport,
                               Airport inboundDepartureAirport,
                               Mealtype mealtype,
                               Boolean oceanview,
                               Roomtype roomtype) {
        Offer newOffer = new Offer();

        offerRepository.save(newOffer);
    }
}
