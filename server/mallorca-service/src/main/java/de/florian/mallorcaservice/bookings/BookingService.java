package de.florian.mallorcaservice.bookings;

import de.florian.mallorcaservice.bookings.model.Booking;
import de.florian.mallorcaservice.bookings.model.BookingRepository;
import de.florian.mallorcaservice.customers.CustomerService;
import de.florian.mallorcaservice.customers.model.Customer;
import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import de.florian.mallorcaservice.offers.model.Offer;
import de.florian.mallorcaservice.offers.model.OfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookingService {

    private BookingRepository bookingRepository;
    private HotelRepository hotelRepository;
    private OfferRepository offerRepository;
    private CustomerService customerService;

    public Integer getNumberBookingsOfHotel(final Long hotelId) {
        final Hotel hotel = hotelRepository.getReferenceById(hotelId);
        return bookingRepository.findByHotel(hotel).size();
    }

    public UUID placeBooking(final String email, final Long offerId) {
        final Customer customer = customerService.addCostumer(email);
        final Offer offer = offerRepository.getReferenceById(offerId);

        final Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setHotel(offer.getHotel());
        booking.setPrice(offer.getPrice());
        booking.setInboundDepartureDateTime(offer.getInboundDepartureDateTime());
        booking.setOutboundDepartureDateTime(offer.getOutboundDepartureDateTime());
        booking.setRoomtype(offer.getRoomtype());

        bookingRepository.save(booking);

        offerRepository.delete(offer);

        return booking.getBookingId();
    }
}
