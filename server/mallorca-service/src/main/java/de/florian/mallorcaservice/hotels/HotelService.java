package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.OfferService;
import de.florian.mallorcaservice.offers.model.OffersOfHotel;
import de.florian.mallorcaservice.requests.FilteredRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HotelService {

    private HotelRepository hotelRepository;
    private OfferService offerService;

    public List<HotelOverviewDTO> getHotelOfferOverview(){
        return hotelRepository.findHotelOverviewDTO();
    }

    public OffersOfHotel getOffersOfHotel(FilteredRequest filters, Long hotelId) {
        final OffersOfHotel offersOfHotel = new OffersOfHotel();
        final Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        offersOfHotel.setOffers(offerService.getOffersOfHotel(filters, hotel));
        offersOfHotel.setHotel(hotel);

        return offersOfHotel;
    }
}
