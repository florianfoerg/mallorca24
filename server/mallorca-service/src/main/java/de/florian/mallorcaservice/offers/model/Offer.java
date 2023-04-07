package de.florian.mallorcaservice.offers.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
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
@Table(name = "offers", indexes = {
        @Index(name = "price_index", columnList = "price"),
        @Index(name = "hotel_index", columnList = "hotel_id"),
        @Index(name = "airport_index", columnList = "outboundDepartureAirport"),
        @Index(name = "search_index_airport", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime"),
        @Index(name = "search_index_airport", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime,outboundDepartureAirport"),
        @Index(name = "search_index_hotel", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime,hotel_id"),
        @Index(name = "search_index_roomtype", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime,roomtype"),
        @Index(name = "search_index_mealtype", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime,mealtype"),
        @Index(name = "search_index_price", columnList = "countAdults,countChildren,outboundDepartureDateTime,inboundArrivalDateTime,price"),
})

public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long offerId;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotNull
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime inboundArrivalDateTime;

    @NotNull
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime outboundDepartureDateTime;

    @Min(1)
    private Integer countAdults;

    private Integer countChildren;

    private Double price;

    @NotNull
    private Airport outboundDepartureAirport;

    private Mealtype mealtype;
    private Boolean oceanview;
    private Roomtype roomtype;
}
