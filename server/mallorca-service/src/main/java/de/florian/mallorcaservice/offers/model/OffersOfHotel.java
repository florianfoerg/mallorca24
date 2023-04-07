package de.florian.mallorcaservice.offers.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import lombok.Data;

import java.util.List;

@Data
public class OffersOfHotel {
    Hotel hotel;
    List<OfferDTO> offers;
}
