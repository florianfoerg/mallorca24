package de.florian.mallorcaservice.offers.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MinOfferWrapper {

    private Long hotelId;
    private Double minPrice;

}
