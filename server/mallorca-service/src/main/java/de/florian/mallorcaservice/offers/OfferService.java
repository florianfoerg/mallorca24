package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.bookings.BookingService;
import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.*;
import de.florian.mallorcaservice.offers.model.mapper.OfferMapper;
import de.florian.mallorcaservice.requests.FilteredRequest;
import de.florian.mallorcaservice.requests.RequestFilter;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.*;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private HotelRepository hotelRepository;
    private BookingService bookingService;

    /**
     * Creates a new offer for the specified hotel and saves it to the repository.
     *
     * @param newOffer the offer to create
     * @param hotelId  the ID of the hotel for which the offer is being created
     * @throws NoSuchElementException if the specified hotel ID does not exist in the repository
     */
    public void createNewOffer(Offer newOffer, Long hotelId) {
        newOffer.setHotel(hotelRepository.findById(hotelId).orElseThrow());
        offerRepository.save(newOffer);
    }

    /**
     * Returns a list of offers for the specified hotel, filtered by the given request filters.
     *
     * @param filters the filters to apply to the offers
     * @return a list of offers matching the given filters
     * @throws NoSuchElementException if the specified hotel ID does not exist in the repository
     */
    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<OfferDTO> getOffersOfHotelFiltered(final FilteredRequest filters, Hotel hotel) {
        List<Offer> offers = offerRepository.findByArgsAndHotel(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), hotel.getHotelId(), filters.getDuration());

        if (filters.getFilter().contains(RequestFilter.MEALTYPE)) {
            offers.removeIf(offer -> !filters.getMealtypes().contains(offer.getMealtype()));
        }

        if (filters.getFilter().contains(RequestFilter.ROOMTYPE)) {
            offers.removeIf(offer -> !filters.getRoomtypes().contains(offer.getRoomtype()));
        }

        if (filters.getFilter().contains(RequestFilter.OCEANVIEW)) {
            offers.removeIf(offer -> offer.getOceanview() != filters.getOceanview());
        }

        if (filters.getFilter().contains(RequestFilter.PRICE)) {
            offers.removeIf(offer -> offer.getPrice() > filters.getMaxPrice());
        }

        if (filters.getFilter().contains(RequestFilter.AIRPORT)) {
            offers.removeIf(offer -> !filters.getDepartureAirports().contains(offer.getOutboundDepartureAirport()));
        }


        return offers.stream().sorted(Comparator.comparing(Offer::getPrice)).map(OfferMapper.INSTANCE::offerToOfferDTO).toList();
    }

    /**
     * Returns a list of offers filtered by the given request filters.
     *
     * @param filters the filters to apply to the offers
     * @return a list of offers matching the given filters
     */
    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<HotelOverviewDTO> getOffersFiltered(final FilteredRequest filters) {

        List<MinOfferWrapper> offers = offerRepository.findMinAllArgs(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(),
                filters.getFilter().contains(RequestFilter.AIRPORT), filters.getDepartureAirports(),
                filters.getFilter().contains(RequestFilter.MEALTYPE), filters.getMealtypes(),
                filters.getFilter().contains(RequestFilter.ROOMTYPE), filters.getRoomtypes(),
                filters.getFilter().contains(RequestFilter.OCEANVIEW), filters.getOceanview(),
                filters.getDuration()
        );

        List<HotelOverviewDTO> offerOverviews = new ArrayList<>();

        for (MinOfferWrapper offer : offers) {
            HotelOverviewDTO hotelOverviewDTO = new HotelOverviewDTO(
                    hotelRepository,
                    bookingService,
                    offer.getHotelId(),
                    offer.getMinPrice()
            );
            offerOverviews.add(hotelOverviewDTO);
        }


        // can be filtered after database query because unique for each hotel
        if (filters.getFilter().contains(RequestFilter.STARS)) {
            offerOverviews.removeIf(offer -> filters.getMinStars() > offer.getHotelStars());
        }

        if (filters.getFilter().contains(RequestFilter.POOL)) {
            offerOverviews.removeIf(offer -> filters.getHasPool() != offer.getHasPool());
        }

        if (filters.getFilter().contains(RequestFilter.PRICE)) {
            offerOverviews.removeIf(offer -> offer.getMinPrice() > filters.getMaxPrice());
        }


        return offerOverviews;
    }

    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<OfferDTO> getOffersOfHotel(Hotel hotel) {
        List<Offer> offers = offerRepository.findByHotel(hotel);

        return offers.stream().sorted(Comparator.comparing(Offer::getPrice)).map(OfferMapper.INSTANCE::offerToOfferDTO).toList();
    }

}
