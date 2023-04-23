package de.florian.mallorcaservice.bookings.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByHotel(Hotel hotel);

    Optional<Booking> findByBookingId(UUID bookingId);
}
