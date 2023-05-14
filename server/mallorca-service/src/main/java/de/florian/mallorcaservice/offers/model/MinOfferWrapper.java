package de.florian.mallorcaservice.offers.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@SqlResultSetMapping(
        name = "MinOfferWrapperMapping",
        classes = @ConstructorResult(
                targetClass = MinOfferWrapper.class,
                columns = {
                        @ColumnResult(name = "hotelId", type = Long.class),
                        @ColumnResult(name = "minPrice", type = Double.class)
                }
        )
)
@Entity
public class MinOfferWrapper {
    private static Long i = 0L;

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Long hotelId;
    private Double minPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MinOfferWrapper(Long hotelId, Double minPrice) {
        this.hotelId = hotelId;
        this.minPrice = minPrice;
        this.id = i++;
    }
}
