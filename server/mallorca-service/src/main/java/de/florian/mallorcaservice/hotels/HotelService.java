package de.florian.mallorcaservice.hotels;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HotelService {

    private HotelRepository hotelRepository;

    public void addHotel(String name, Integer stars, String image, String mail, Integer minStayDuration){
        Hotel newHotel = new Hotel();

        newHotel.setHotelName(name);
        newHotel.setHotelStars(stars);
        newHotel.setImage(image);
        newHotel.setMinStayDuration(minStayDuration);
        newHotel.setMail(mail);

        hotelRepository.save(newHotel);
    }
}
