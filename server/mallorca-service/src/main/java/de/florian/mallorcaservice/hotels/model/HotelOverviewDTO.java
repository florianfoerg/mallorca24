package de.florian.mallorcaservice.hotels.model;

import de.florian.mallorcaservice.bookings.BookingService;
import de.florian.mallorcaservice.offers.model.Offer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.mapstruct.Mapping;

import java.util.List;

@NoArgsConstructor
@Data
public class HotelOverviewDTO {
    private Long hotelId;
    private String hotelName;
    private String image;
    private Integer hotelStars;
    private Double minPrice;
    private Boolean hasPool;
    private Boolean petsAllowed;
    private Boolean freeWifi;
    private Boolean closeToAirport;
    private Boolean closeToCentre;
    private Boolean closeToBeach;
    private Double relevance;


    private static Double computeRelevance(final Hotel hotel, final List<Offer> listOffers, final BookingService bookingService) {
        final Double rankingStars = (double)hotel.getHotelStars();
        final Double rankingClicks = (double)hotel.getClicks();
        final Double bookingRate = ((double)bookingService.getNumberBookingsOfHotel(hotel.getHotelId()) / (hotel.getClicks() + 1.00));
        final Double amountOffers = (double)listOffers.stream().parallel().filter(o -> o.getHotel().equals(hotel)).toList().size();

        // Define the weights for each factor
        final Double weightStars = 0.25;
        final Double weightClicks = 0.05;
        final Double weightBookingRate = 0.65;
        final Double weightAmountOffers = 0.05;

        // Compute the weighted average of each factor

        return weightStars * rankingStars +
                weightClicks * rankingClicks +
                weightBookingRate * bookingRate +
                weightAmountOffers * amountOffers;
    }


    public HotelOverviewDTO(final Offer offer, final List<Offer> listOffers, final BookingService bookingService) {

        final Hotel hotel = offer.getHotel();

        this.hotelId = hotel.getHotelId();
        this.hotelName = hotel.getHotelName();
        this.image = hotel.getImage();
        this.hotelStars = hotel.getHotelStars();
        this.minPrice = offer.getPrice();
        this.hasPool = hotel.getHasPool();
        this.petsAllowed = hotel.getPetsAllowed();
        this.freeWifi = hotel.getFreeWifi();
        this.closeToAirport = hotel.getDistanceNextAirport() < 20;
        this.closeToCentre = hotel.getDistanceCentre() < 4000;
        this.closeToBeach = hotel.getDistanceNextBeach() < 2000;
        this.relevance = computeRelevance(hotel, listOffers, bookingService);

    }
}
