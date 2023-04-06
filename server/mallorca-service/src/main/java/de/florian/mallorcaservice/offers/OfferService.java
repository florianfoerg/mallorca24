package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.*;
import de.florian.mallorcaservice.requests.FilteredRequestOffers;
import de.florian.mallorcaservice.requests.RequestFilter;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private HotelRepository hotelRepository;

    /**

     Creates a new offer for the specified hotel and saves it to the repository.
     @param newOffer the offer to create
     @param hotelId the ID of the hotel for which the offer is being created
     @throws NoSuchElementException if the specified hotel ID does not exist in the repository
     */
    public void createNewOffer(Offer newOffer, Long hotelId) {
        newOffer.setHotel(hotelRepository.findById(hotelId).orElseThrow());
        offerRepository.save(newOffer);
    }

    /**

     Returns a list of offers for the specified hotel, filtered by the given request filters.
     @param filters the filters to apply to the offers
     @return a list of offers matching the given filters
     @throws NoSuchElementException if the specified hotel ID does not exist in the repository
     */
    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<Offer> getOffersOfHotel(final FilteredRequestOffers filters) {
        final Hotel correspondingHotel = hotelRepository.findById(filters.getHotelId()).orElseThrow();

        List<Offer> offers = offerRepository.findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndInboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndHotel(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), correspondingHotel);

        return filterOffersCharacteristics(filters, offers);
    }

    /**

     Returns a list of offers filtered by the given request filters.
     @param filters the filters to apply to the offers
     @return a list of offers matching the given filters
     */
    @Cacheable("offers")    //If a user searches for an offer he/she will with a high probability search it again
    public List<Offer> getOffersFiltered(final FilteredRequestOffers filters) {
        List<Offer> offers = offerRepository.findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndInboundDepartureDateTimeAfterAndInboundArrivalDateTimeBefore(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible());

        if (filters.getFilter().contains(RequestFilter.POOL)) {
            offers = offers.stream().parallel().filter(c -> c.getHotel().getHasPool() == filters.getHasPool()).collect(Collectors.toList());
        }

        if (filters.getFilter().contains(RequestFilter.STARS)) {
            offers = offers.stream().parallel().filter(c -> c.getHotel().getHotelStars() >= filters.getMinStars()).collect(Collectors.toList());
        }

        return filterOffersCharacteristics(filters, offers);
    }

    /**

     Filters the given list of offers by the characteristics specified in the given request filters.
     @param filters the filters to apply to the offers
     @param offers the list of offers to filter
     @return a list of offers matching the given filters
     */
    private static List<Offer> filterOffersCharacteristics(FilteredRequestOffers filters, List<Offer> offers) {
        if (filters.getFilter().contains(RequestFilter.MEALTYPE)) {
            offers = offers.stream().parallel().filter(c -> c.getMealtype() == filters.getMealtype()).collect(Collectors.toList());
        }

        if (filters.getFilter().contains(RequestFilter.ROOMTYPE)) {
            offers = offers.stream().parallel().filter(c -> c.getRoomtype() == filters.getRoomtype()).collect(Collectors.toList());
        }

        if (filters.getFilter().contains(RequestFilter.OCEANVIEW)) {
            offers = offers.stream().parallel().filter(c -> c.getOceanview() == filters.getOceanview()).collect(Collectors.toList());
        }

        if (filters.getFilter().contains(RequestFilter.PRICE)) {
            offers = offers.stream().parallel().filter(c -> c.getPrice() <= filters.getMaxPrice()).collect(Collectors.toList());
        }

        offers = offers.stream().parallel().filter(c -> ChronoUnit.DAYS.between(c.getInboundDepartureDateTime(), c.getInboundArrivalDateTime()) == filters.getDuration()).collect(Collectors.toList());

        return offers;
    }
}
