package de.florian.mallorcaservice.hotels.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class HotelOverviewDTO {
    private Long hotelId;
    private String hotelName;
    private String image;
    private Integer hotelStars;
    private Double minPrice;
    private Boolean hasPool;
    private Boolean petsAllowed;
    private Boolean freeWifi;
    private Boolean closeToAirport;
    private Boolean closeToCentre;
    private Boolean closeToBeach;
}
