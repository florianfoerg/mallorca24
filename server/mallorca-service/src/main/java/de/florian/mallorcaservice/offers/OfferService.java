package de.florian.mallorcaservice.offers;

import com.google.common.hash.Hashing;
import de.florian.mallorcaservice.bookings.BookingService;
import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.*;
import de.florian.mallorcaservice.offers.model.mapper.OfferMapper;
import de.florian.mallorcaservice.requests.FilteredRequest;
import de.florian.mallorcaservice.requests.RequestFilter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.*;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private HotelRepository hotelRepository;
    private BookingService bookingService;

    @PersistenceContext
    private EntityManager entityManager;


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
        final String table = "search_" + getHashOffer(filters);

        final String sqlQuery = "SELECT t.hotel_id as hotelId, MIN(t.price) as minPrice" +
                " FROM " + table + " t" +
                " WHERE t.count_adults = " + filters.getCountAdults() +
                " AND t.count_children = " + filters.getCountChildren() +
                " AND t.outbound_departure_date_time >= \'" + filters.getEarliestPossible() +
                "\' AND t.duration = " + filters.getDuration() +
                " AND t.inbound_departure_date_time <= \'" + filters.getLatestPossible() +
                "\' AND (" +  filters.getFilter().contains(RequestFilter.AIRPORT)  + " = false OR t.outbound_departure_airport IN " + filters.getAirportsString() + ") " +
                " AND ( " +  filters.getFilter().contains(RequestFilter.MEALTYPE)  + " = false OR t.mealtype IN " + filters.getMealtypesString() + ") " +
                " AND (" +  filters.getFilter().contains(RequestFilter.ROOMTYPE)  + " = false OR t.roomtype IN " + filters.getRoomtypesString() + ") " +
                " AND (" +  filters.getFilter().contains(RequestFilter.OCEANVIEW)  + " = false OR t.oceanview = " + filters.getOceanview() +
                ") GROUP BY t.hotel_id";


        final Query q = entityManager.createNativeQuery(sqlQuery, "MinOfferWrapperMapping");

        List<MinOfferWrapper> offers = q.getResultList();

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

    public static Integer getHashOffer(FilteredRequest filteredRequest) {
        String hashString = Hashing
                .sha256()
                .hashBytes(String.valueOf(filteredRequest.getCountAdults() * filteredRequest.getDuration() * (filteredRequest.getCountChildren() + 1)).getBytes(StandardCharsets.UTF_8))
                .toString()
                .substring(0, 4);
        BigInteger hashValue = new BigInteger(hashString, 16);
        return Math.abs(hashValue.intValue()) % 500;
    }

}
