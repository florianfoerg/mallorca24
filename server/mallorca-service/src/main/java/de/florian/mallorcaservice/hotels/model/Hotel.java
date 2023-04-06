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
@Table
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long hotelId;

    @NotNull
    private String hotelName;

    private String mail;

    private String image;

    @Column(columnDefinition = "INTEGER DEFAULT 1")
    private Integer minStayDuration;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer hotelStars;

}
