package de.florian.mallorcaservice.bookings;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private BookingService bookingService;

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

    @GetMapping(value = "/hotelBookings/{hotel_id}")
    public ResponseEntity<Integer> getNumberBookingsHotel(@PathVariable("hotel_id") Long hotelId){
        return ResponseEntity.ok(bookingService.getNumberBookingsOfHotel(hotelId));
    }
}
