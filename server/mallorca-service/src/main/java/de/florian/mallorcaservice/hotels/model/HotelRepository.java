package de.florian.mallorcaservice.hotels.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query(value = "SELECT new de.florian.mallorcaservice.hotels.model.HotelOverviewDTO(h.hotelId, h.hotelName, h.image, h.hotelStars, min(o.price)) from Hotel h join Offer o on h.hotelId = o.hotel.hotelId group by o.hotel.hotelId")
    List<HotelOverviewDTO> findHotelOverviewDTO();

    //define helper && filter afterwards
    @Query(value = "SELECT new de.florian.mallorcaservice.hotels.model.HotelOverviewDTO(h.hotelId, h.hotelName, h.image, h.hotelStars, min(o.price)) from Hotel h join Offer o on h.hotelId = o.hotel.hotelId where :adultCount = o.countAdults and :childrenCount = o.countChildren and :minDate <= o.outboundDepartureDateTime and :maxDate >= o.inboundArrivalDateTime group by o.hotel.hotelId")
    List<HotelOverviewDTO> findFilteredHotelOverviewDTO(@Param("adultCount") Integer adultCount, @Param("childrenCount") Integer childrenCount, @Param("minDate") LocalDateTime minDate, @Param("maxDate") LocalDateTime maxDate);

}