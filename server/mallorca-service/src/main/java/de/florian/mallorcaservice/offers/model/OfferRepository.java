package de.florian.mallorcaservice.offers.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByHotel(Hotel hotel);

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndHotel(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Hotel hotel);

    @Query("SELECT o FROM Offer o WHERE o.countAdults = :countAdults AND o.countChildren = :countChildren " +
            "AND o.outboundDepartureDateTime >= :outboundDepartureDateTime AND o.inboundDepartureDateTime <= :inboundDepartureDateTime " +
            "AND FUNCTION('DATE_PART', 'day', o.inboundDepartureDateTime - o.outboundDepartureDateTime) = :duration " +
            "AND o.hotel.hotelId = :hotelId")

    List<Offer> findByArgsAndHotel(
            @Param("countAdults") @Min(1) Integer countAdults,
            @Param("countChildren") Integer countChildren,
            @Param("outboundDepartureDateTime") @NotNull LocalDateTime outboundDepartureDateTime,
            @Param("inboundDepartureDateTime") @NotNull LocalDateTime inboundDepartureDateTime,
            @Param("hotelId") @NotNull Long hotelId,
            @Param("duration") @NotNull Integer duration
    );

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBefore(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime);

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndOutboundDepartureAirportIn(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Collection<@NotNull Airport> outboundDepartureAirport);

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndMealtypeIn(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Collection<Mealtype> mealtype);

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndHotelHotelStarsGreaterThanEqual(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, @Min(1) @Max(5) Integer hotel_hotelStars);

    List<Offer> findByCountAdultsAndCountChildrenAndOutboundDepartureDateTimeAfterAndInboundDepartureDateTimeBeforeAndPriceLessThanEqual(@Min(1) Integer countAdults, Integer countChildren, @NotNull LocalDateTime outboundDepartureDateTime, @NotNull LocalDateTime inboundArrivalDateTime, Double price);

    @Query("SELECT new de.florian.mallorcaservice.offers.model.MinOfferWrapper(o.hotel.hotelId, MIN(o.price)) FROM Offer o WHERE o.countAdults = :countAdults AND o.countChildren = :countChildren " +
            "AND o.outboundDepartureDateTime >= :outboundDepartureDateTime AND o.inboundDepartureDateTime <= :inboundDepartureDateTime " +
            "AND (:checkAirports = false OR o.outboundDepartureAirport IN :outboundDepartureAirport) " +
            "AND (:checkMealtype = false OR o.mealtype IN :mealtypes)" +
            "AND (:checkRoomtype = false OR o.roomtype IN :roomtypes)" +
            "AND (:checkOceanview = false OR o.oceanview = :oceanview) " +
            "AND FUNCTION('DATE_PART', 'day', o.inboundDepartureDateTime - o.outboundDepartureDateTime) = :duration " +
            "GROUP BY o.hotel.hotelId")

    List<MinOfferWrapper> findMinAllArgs(
            @Param("countAdults") @Min(1) Integer countAdults,
            @Param("countChildren") Integer countChildren,
            @Param("outboundDepartureDateTime") @NotNull LocalDateTime outboundDepartureDateTime,
            @Param("inboundDepartureDateTime") @NotNull LocalDateTime inboundDepartureDateTime,
            @Param("checkAirports") @NotNull Boolean checkAirports,
            @Param("outboundDepartureAirport") Collection<@NotNull Airport> outboundDepartureAirport,
            @Param("checkMealtype") @NotNull Boolean checkMealtype,
            @Param("mealtypes") Collection<@NotNull Mealtype> mealtypes,
            @Param("checkRoomtype") @NotNull Boolean checkRoomtype,
            @Param("roomtypes") Collection<@NotNull Roomtype> roomtypes,
            @Param("checkOceanview") @NotNull Boolean checkOceanview,
            @Param("oceanview") Boolean oceanview,
            @Param("duration") @NotNull Integer duration
            );

}
