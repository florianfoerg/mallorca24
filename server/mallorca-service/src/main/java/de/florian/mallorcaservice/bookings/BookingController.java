package de.florian.mallorcaservice.bookings;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @PostMapping(value = "/confirmation")
    public ResponseEntity confirmBooking(@RequestParam Long bookingId) {
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/decline")
    public ResponseEntity declineBooking(@RequestParam Long bookingId) {
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/booking/{id}")
    public ResponseEntity placeBooking(@RequestParam Long hotelId,
                                       @RequestParam Long customerId,
                                       @RequestParam Integer duration,
                                       @RequestParam LocalDateTime startDate) {
        return ResponseEntity.ok().build();
    }
}
