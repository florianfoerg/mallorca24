package de.florian.mallorcaservice.bookings;

import de.florian.mallorcaservice.bookings.model.BookingRepository;
import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookingService {

    private BookingRepository bookingRepository;
    private HotelRepository hotelRepository;

    public Integer getNumberBookingsOfHotel(final Long hotelId) {
        final Hotel hotel = hotelRepository.getReferenceById(hotelId);
        return bookingRepository.findByHotel(hotel).size();
    }
}
