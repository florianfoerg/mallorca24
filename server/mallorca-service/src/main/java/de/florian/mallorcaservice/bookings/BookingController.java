package de.florian.mallorcaservice.bookings;

import de.florian.mallorcaservice.bookings.model.Booking;
import de.florian.mallorcaservice.bookings.model.BookingRepository;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private BookingService bookingService;
    private BookingRepository bookingRepository;

    @PostMapping(value = "/booking/{offer_id}")
    public ResponseEntity<UUID> placeBooking(@PathParam("email") String email, @PathVariable("offer_id") Long offerId) {
        return ResponseEntity.ok(bookingService.placeBooking(email, offerId));
    }

    @GetMapping(value = "/hotelBookings/{hotel_id}")
    public ResponseEntity<Integer> getNumberBookingsHotel(@PathVariable("hotel_id") Long hotelId){
        return ResponseEntity.ok(bookingService.getNumberBookingsOfHotel(hotelId));
    }
    @GetMapping(value = "/validate/{booking_id}")
    public ResponseEntity<Void> validateOffer(@PathVariable("booking_id") UUID bookingId) {
        final Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);

        if(booking.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

}
