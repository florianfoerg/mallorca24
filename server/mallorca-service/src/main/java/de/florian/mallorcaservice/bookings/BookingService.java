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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BookingService {

    @AllArgsConstructor
    private static class ConfirmationSender extends Thread {

        final static private RestTemplate restTemplate = new RestTemplate();
        final static private HttpHeaders headers = new HttpHeaders();

        private final Booking booking;
        private final String email;

        private static void sendMailSuccessCustomer(final Booking booking, final String email) {

            headers.setContentType(MediaType.APPLICATION_JSON);

            final Map<String, Object> mapValues = new HashMap<>();

            mapValues.put("bookingId", booking.getBookingId());
            mapValues.put("dateDeparture", booking.getOutboundDepartureDateTime());
            mapValues.put("dateArrival", booking.getInboundDepartureDateTime());
            mapValues.put("hotelName", booking.getHotel().getHotelName());
            mapValues.put("price", booking.getPrice());
            mapValues.put("to", email);

            final HttpEntity<Map<String, Object>> requestBody = new HttpEntity<>(mapValues, headers);

            restTemplate.postForEntity("http://localhost:5000/emails/success-customer", requestBody, String.class);
        }

        private static void sendMailHotelSuccess(final Booking booking) {

            headers.setContentType(MediaType.APPLICATION_JSON);

            final Hotel hotel = booking.getHotel();

            final Map<String, Object> mapValues = new HashMap<>();

            mapValues.put("to", hotel.getMail());
            mapValues.put("bookingId", booking.getBookingId());
            mapValues.put("dateDeparture", booking.getOutboundDepartureDateTime());
            mapValues.put("dateArrival", booking.getInboundDepartureDateTime());
            mapValues.put("hotelName", hotel.getHotelName());
            mapValues.put("price", booking.getPrice());
            mapValues.put("roomType", booking.getRoomtype());


            final HttpEntity<Map<String, Object>> requestBody = new HttpEntity<>(mapValues, headers);

            restTemplate.postForEntity("http://localhost:5000/emails/success-hotel", requestBody, String.class);
        }

        @Override
        public void run() {
            sendMailHotelSuccess(booking);
            sendMailSuccessCustomer(booking, email);
        }
    }

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

        final Thread confirmationSender = new ConfirmationSender(booking, email);
        confirmationSender.start();

        return booking.getBookingId();
    }
}
