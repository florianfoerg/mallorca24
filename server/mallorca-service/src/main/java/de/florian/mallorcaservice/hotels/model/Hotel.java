package de.florian.mallorcaservice.hotels.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "hotels", indexes = {
        @Index(name = "stars_index", columnList = "hotelStars")
})
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long hotelId;

    @NotNull
    private String hotelName;

    private String mail;
    private String image;

    @Column(length = 2048)
    private String description;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer hotelStars;

    private Boolean hasPool;
    private Boolean petsAllowed;
    private Boolean freeWifi;

    private Integer distanceNextAirport;
    private Integer distanceNextBeach;
    private Integer distanceCentre;

    private Long clicks;

    @NotNull
    private Marker marker;

    @Data
    @Embeddable
    private static class Marker {
        private Double longitude;
        private Double latitude;
    }

}
