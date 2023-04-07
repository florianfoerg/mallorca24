package de.florian.mallorcaservice.offers.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OfferDTO {

    private Long offerId;
    private Long hotelId;

    @NotNull
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime inboundArrivalDateTime;

    @NotNull
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime outboundDepartureDateTime;

    private Double price;

    @NotNull
    private Airport outboundDepartureAirport;

    private Mealtype mealtype;
    private Boolean oceanview;
    private Roomtype roomtype;
}
