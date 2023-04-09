package de.florian.mallorcaservice.bookings.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByHotel(Hotel hotel);
}
