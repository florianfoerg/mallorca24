package de.florian.mallorcaservice.hotels.model;

import de.florian.mallorcaservice.bookings.BookingService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Data
@Component
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


    private static Double computeRelevance(final Hotel hotel, final BookingService bookingService) {
        final Double rankingStars = (double)hotel.getHotelStars();
        final Double rankingClicks = (double)hotel.getClicks();
        final Double bookingRate = ((double)bookingService.getNumberBookingsOfHotel(hotel.getHotelId()) / (hotel.getClicks() + 1.00));

        // Define the weights for each factor
        final Double weightStars = 0.20;
        final Double weightClicks = 0.075;
        final Double weightBookingRate = 0.725 * 3;

        // Compute the weighted average of each factor

        return weightStars * rankingStars +
                weightClicks * rankingClicks +
                weightBookingRate * bookingRate;
    }


    public HotelOverviewDTO(final HotelRepository hotelRepository, final BookingService bookingService,final Long hotelId, final Double price) {

        final Hotel hotel = hotelRepository.getReferenceById(hotelId);

        this.hotelId = hotel.getHotelId();
        this.hotelName = hotel.getHotelName();
        this.image = hotel.getImage();
        this.hotelStars = hotel.getHotelStars();
        this.minPrice = price;
        this.hasPool = hotel.getHasPool();
        this.petsAllowed = hotel.getPetsAllowed();
        this.freeWifi = hotel.getFreeWifi();
        this.closeToAirport = hotel.getDistanceNextAirport() < 20;
        this.closeToCentre = hotel.getDistanceCentre() < 4000;
        this.closeToBeach = hotel.getDistanceNextBeach() < 2000;
        this.relevance = computeRelevance(hotel, bookingService);

    }
}
