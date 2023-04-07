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

    public HotelOverviewDTO(Long hotelId, @NotNull String hotelName, String image, @NotNull @Min(1) @Max(5) Integer hotelStars, Double minPrice){
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.image = image;
        this.hotelStars = hotelStars;
        this.minPrice = minPrice;
    }

}
