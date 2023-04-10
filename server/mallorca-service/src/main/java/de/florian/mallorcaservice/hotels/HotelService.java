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
    private HotelRecommendationRepository hotelSuggestionRepository;


    public List<OfferDTO> getOffersOfHotelFiltered(FilteredRequest filters, Long hotelId) {
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        return offerService.getOffersOfHotelFiltered(filters, hotel);
    }

    public List<OfferDTO> getOffersOfHotel(Long hotelId) {
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        return offerService.getOffersOfHotel(hotel);
    }

    public List<HotelOverviewDTO> getCurrentRecommendations() {
        return hotelSuggestionRepository.findAll().stream().map(HotelRecommendation::getHotel).map(HotelMapper.INSTANCE::hotelToHotelOverviewDTO).collect(Collectors.toList());
    }

    public Hotel requestHotelData(final Long hotelId) {
        final Hotel hotel = hotelRepository.findById(hotelId).orElse(null);

        // track how often a hotel gets shown
        if(hotel != null) {
            hotel.setClicks(hotel.getClicks() + 1);
            hotelRepository.save(hotel);
        }

        return hotel;
    }
}
