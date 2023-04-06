package de.florian.mallorcaservice.offers.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByHotel(Hotel hotel);

    List<Offer> findByCountAdultsLessThanEqualAndCountChildrenLessThanEqualAndInboundDepartureDateTimeAfterAndInboundArrivalDateTimeBefore(Integer adultCount, Integer childrenCount, LocalDateTime minDate, LocalDateTime maxDate);

}
