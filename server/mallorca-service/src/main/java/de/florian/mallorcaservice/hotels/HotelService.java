package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.*;
import de.florian.mallorcaservice.offers.OfferService;
import de.florian.mallorcaservice.offers.model.OffersOfHotel;
import de.florian.mallorcaservice.requests.FilteredRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HotelService {

    private HotelRepository hotelRepository;
    private OfferService offerService;
    private HotelSuggestionRepository hotelSuggestionRepository;


    public OffersOfHotel getOffersOfHotelFiltered(FilteredRequest filters, Long hotelId) {
        final OffersOfHotel offersOfHotel = new OffersOfHotel();
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        offersOfHotel.setOffers(offerService.getOffersOfHotelFiltered(filters, hotel));
        offersOfHotel.setHotel(hotel);

        return offersOfHotel;
    }

    public OffersOfHotel getOffersOfHotel(Long hotelId) {
        final OffersOfHotel offersOfHotel = new OffersOfHotel();
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        offersOfHotel.setOffers(offerService.getOffersOfHotel(hotel));
        offersOfHotel.setHotel(hotel);

        return offersOfHotel;
    }

    public List<Hotel> getCurrentSuggestions() {
        return hotelSuggestionRepository.findAll().stream().map(HotelSuggestion::getHotel).collect(Collectors.toList());
    }
}
