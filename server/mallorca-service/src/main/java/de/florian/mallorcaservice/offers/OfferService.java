package de.florian.mallorcaservice.offers;

import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.*;
import de.florian.mallorcaservice.requests.FilteredRequestOffers;
import de.florian.mallorcaservice.requests.RequestFilter;
import lombok.AllArgsConstructor;
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

    public void createNewOffer(Offer newOffer, Long hotelId) {
        newOffer.setHotel(hotelRepository.findById(hotelId).orElseThrow());
        offerRepository.save(newOffer);
    }

    /**
     * Returns a list of Offer objects that match the given filters for a particular hotel.
     * <p>
     * This method takes a FilteredRequestOffers object as input, which contains various filters for the search, such as the hotel ID, the number of adults and children, the desired meal type, room type, ocean view, and the date range for the search. The method first calculates the minimum and maximum date ranges based on the filter duration and earliest/latest possible dates. It then retrieves a list of offers from the offerRepository based on the provided filters.
     * <p>
     * If applicable, the method filters the offers based on meal type, room type, ocean view, and max price. The method then further filters the offers based on the provided date range, and returns a list of Offer objects that match all of the specified filters.
     *
     * @param filters a FilteredRequestOffers object containing various filters for the search
     * @return a List of Offer objects that match the given filters
     * @throws NoSuchElementException if the specified hotel ID does not exist in the hotelRepository
     */

    public List<Offer> getOffersOfHotel(FilteredRequestOffers filters) {

        List<Offer> offers = offerRepository.findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndInboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndHotel(filters.getCountAdults(),
                filters.getCountChildren(), filters.getEarliestPossible(), filters.getLatestPossible(), hotelRepository.findById(filters.getHotelId()).orElseThrow());


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
