package de.florian.mallorcaservice.offers.model;

import de.florian.mallorcaservice.hotels.model.Hotel;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long offerId;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotNull
    private LocalDateTime outboundDepartureDateTime;

    @NotNull
    private LocalDateTime inboundDepartureDateTime;

    @Min(1)
    private Integer countAdults;

    private Integer countChildren;

    private Double price;

    @NotNull
    private Airport inboundDepartureAirport;

    @NotNull
    private Airport inboundArrivalAirport;

    private Mealtype mealtype;
    private Boolean oceanview;
    private Roomtype roomtype;
}