package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.*;
import de.florian.mallorcaservice.hotels.model.mapper.HotelMapper;
import de.florian.mallorcaservice.offers.OfferService;
import de.florian.mallorcaservice.offers.model.OfferDTO;
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


    public List<OfferDTO> getOffersOfHotelFiltered(FilteredRequest filters, Long hotelId) {
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        return offerService.getOffersOfHotelFiltered(filters, hotel);
    }

    public List<OfferDTO> getOffersOfHotel(Long hotelId) {
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        return offerService.getOffersOfHotel(hotel);
    }

    public List<HotelOverviewDTO> getCurrentSuggestions() {
        return hotelSuggestionRepository.findAll().stream().map(HotelSuggestion::getHotel).map(HotelMapper.INSTANCE::hotelToHotelOverviewDTO).collect(Collectors.toList());
    }
}
