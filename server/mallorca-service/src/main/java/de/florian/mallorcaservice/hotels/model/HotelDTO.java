package de.florian.mallorcaservice.hotels.model;

import lombok.Data;

import java.net.URI;

@Data
public class HotelDTO {
    private Long hotelId;
    private String hotelName;
    private URI image;
    private Integer hotelStars;
    private Double min_price;
}
