package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/hotels")
public class HotelController {

    private HotelRepository hotelRepository;
    private HotelService hotelService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Hotel>> getAllCustomers() {
        List<Hotel> hotels = hotelRepository.findAll();
        return ResponseEntity.ok(hotels);
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Void> addNewCustomer(@RequestBody String name,
                                               @RequestBody Integer stars,
                                               @RequestBody String image,
                                               @RequestBody String mail,
                                               @RequestBody Integer minStayDuration) {

        hotelService.addHotel(name, stars, image, mail, minStayDuration);

        return ResponseEntity.ok().build();
    }
}
