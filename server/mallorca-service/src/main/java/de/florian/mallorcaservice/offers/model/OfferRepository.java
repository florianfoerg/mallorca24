package de.florian.mallorcaservice.offers.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByHotel(Hotel hotel);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndHotel(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Hotel hotel);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBefore(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndOutboundDepartureAirportIn(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Collection<@NotNull Airport> outboundDepartureAirport);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndMealtypeIn(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Collection<Mealtype> mealtype);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndHotelHotelStarsGreaterThanEqual(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, @Min(1) @Max(5) Integer hotel_hotelStars);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndOutboundDepartureDateTimeAfterAndInboundArrivalDateTimeBeforeAndPriceLessThanEqual(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Double price);

}
