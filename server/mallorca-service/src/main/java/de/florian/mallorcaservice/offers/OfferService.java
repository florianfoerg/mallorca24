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
import java.util.stream.Collectors;

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
        List<Offer> offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndHotel(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), hotel);

        return filterOffersCharacteristics(filters, offers).stream().sorted(Comparator.comparing(Offer::getPrice)).map(OfferMapper.INSTANCE::offerToOfferDTO).toList();
    }

    /**
     * Returns a list of offers filtered by the given request filters.
     *
     * @param filters the filters to apply to the offers
     * @return a list of offers matching the given filters
     */
    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<HotelOverviewDTO> getOffersFiltered(final FilteredRequest filters) {
        List<Offer> offers;


        if (filters.getFilter().contains(RequestFilter.AIRPORT)) {
            offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndOutboundDepartureAirportIn(filters.getCountAdults(),
                    filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), filters.getDepartureAirports());
            filters.getFilter().remove(RequestFilter.AIRPORT);


        } else if (filters.getFilter().contains(RequestFilter.MEALTYPE)) {
            offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndMealtypeIn(filters.getCountAdults(),
                    filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), filters.getMealtypes());
            filters.getFilter().remove(RequestFilter.MEALTYPE);


        } else if (filters.getFilter().contains(RequestFilter.STARS)) {
            offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndHotelHotelStarsGreaterThanEqual(filters.getCountAdults(),
                    filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), filters.getMinStars());
            filters.getFilter().remove(RequestFilter.STARS);


        } else if (filters.getFilter().contains(RequestFilter.PRICE)) {
            offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndPriceLessThanEqual(filters.getCountAdults(),
                    filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), filters.getMaxPrice());
            filters.getFilter().remove(RequestFilter.PRICE);


        } else {
            offers = offerRepository.findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBefore(filters.getCountAdults(),
                    filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible());
        }


        if (filters.getFilter().contains(RequestFilter.STARS)) {
            offers.removeIf(offer -> filters.getMinStars() > offer.getHotel().getHotelStars());
        }

        if (filters.getFilter().contains(RequestFilter.POOL)) {
            offers.removeIf(offer -> filters.getHasPool() != offer.getHotel().getHasPool());
        }

        offers = filterOffersCharacteristics(filters, offers);

        List<Offer> minPriceOffers = offers.stream()
                .collect(Collectors.groupingBy(
                        offer -> offer.getHotel().getHotelId(),
                        Collectors.minBy(Comparator.comparing(Offer::getPrice))))
                .values()
                .stream()
                .map(Optional::get)
                .collect(Collectors.toList());


        final List<Offer> finalOffers = offers;

        return minPriceOffers.stream().map(o -> new HotelOverviewDTO(o, finalOffers, bookingService)).toList();
    }

    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<OfferDTO> getOffersOfHotel(Hotel hotel) {
        List<Offer> offers = offerRepository.findByHotel(hotel);

        return offers.stream().sorted(Comparator.comparing(Offer::getPrice)).map(OfferMapper.INSTANCE::offerToOfferDTO).toList();
    }

    /**
     * Filters the given list of offers by the characteristics specified in the given request filters.
     *
     * @param filters the filters to apply to the offers
     * @param offers  the list of offers to filter
     * @return a list of offers matching the given filters
     */
    private static List<Offer> filterOffersCharacteristics(FilteredRequest filters, List<Offer> offers) {

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

        offers.removeIf(offer -> ChronoUnit.DAYS.between(offer.getOutboundDepartureDateTime(), offer.getInboundDepartureDateTime()) + 1 != filters.getDuration());

        return offers;
    }

}
