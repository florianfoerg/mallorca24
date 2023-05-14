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
import org.eclipse.persistence.annotations.Partitioned;
import org.eclipse.persistence.annotations.RangePartition;
import org.eclipse.persistence.annotations.RangePartitioning;

import java.time.LocalDateTime;



/*

-- Table: public.offers

-- DROP TABLE IF EXISTS public.offers;

CREATE TABLE IF NOT EXISTS public.offers
(
    offer_id bigint NOT NULL,
    count_adults integer,
    count_children integer,
    inbound_departure_date_time timestamp(6) without time zone NOT NULL,
    mealtype smallint,
    oceanview boolean,
    outbound_departure_airport smallint NOT NULL,
    outbound_departure_date_time timestamp(6) without time zone NOT NULL,
    price double precision,
    roomtype smallint,
    hotel_id bigint NOT NULL,
    duration integer,
    CONSTRAINT offers_pkey PRIMARY KEY (offer_id, hotel_id),
    CONSTRAINT fk9aljdqoi39d35fattfdgp95ac FOREIGN KEY (hotel_id)
        REFERENCES public.hotels (hotel_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT offers_count_adults_check CHECK (count_adults >= 1)
) PARTITION BY RANGE (hotel_id);

ALTER TABLE IF EXISTS public.offers
    OWNER to postgres;
-- Index: airport_index

-- DROP INDEX IF EXISTS public.airport_index;

CREATE INDEX IF NOT EXISTS airport_index
    ON public.offers USING btree
    (outbound_departure_airport ASC NULLS LAST)
;
-- Index: hotel_index

-- DROP INDEX IF EXISTS public.hotel_index;

CREATE INDEX IF NOT EXISTS hotel_index
    ON public.offers USING btree
    (hotel_id ASC NULLS LAST)
;
-- Index: price_index

-- DROP INDEX IF EXISTS public.price_index;

CREATE INDEX IF NOT EXISTS price_index
    ON public.offers USING btree
    (price ASC NULLS LAST)
;
-- Index: search_index_airport

-- DROP INDEX IF EXISTS public.search_index_airport;

CREATE INDEX IF NOT EXISTS search_index_airport
    ON public.offers USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, outbound_departure_airport ASC NULLS LAST)
;
-- Index: search_index_hotel

-- DROP INDEX IF EXISTS public.search_index_hotel;

CREATE INDEX IF NOT EXISTS search_index_hotel
    ON public.offers USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, hotel_id ASC NULLS LAST)
;
-- Index: search_index_mealtype

-- DROP INDEX IF EXISTS public.search_index_mealtype;

CREATE INDEX IF NOT EXISTS search_index_mealtype
    ON public.offers USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, mealtype ASC NULLS LAST)
;
-- Index: search_index_price

-- DROP INDEX IF EXISTS public.search_index_price;

CREATE INDEX IF NOT EXISTS search_index_price
    ON public.offers USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, price ASC NULLS LAST)
;
-- Index: search_index_roomtype

-- DROP INDEX IF EXISTS public.search_index_roomtype;

CREATE INDEX IF NOT EXISTS search_index_roomtype
    ON public.offers USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, roomtype ASC NULLS LAST)
;

CREATE INDEX IF NOT EXISTS offer_index
	ON public.offers USING btree
	(offer_id ASC NULLS LAST)
;


*/

/*

DO $$ DECLARE
    hotel_id INTEGER;
BEGIN
    FOR hotel_id IN 1..200 LOOP
        EXECUTE 'CREATE TABLE offers_' || hotel_id || ' PARTITION OF offers FOR VALUES FROM (' || ((hotel_id-1) *5) || ') TO (' || ((hotel_id *5) ) || ');';
    END LOOP;
END $$;


DO $$ DECLARE
    hotel_id INTEGER;
BEGIN
    FOR hotel_id IN 1..200 LOOP
		EXECUTE '
ALTER TABLE IF EXISTS offers_' || hotel_id || '
    OWNER to postgres;
-- Index: airport_index

CREATE INDEX IF NOT EXISTS airport_index_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (outbound_departure_airport ASC NULLS LAST)
;

-- Index: price_index

CREATE INDEX IF NOT EXISTS price_index_' || hotel_id || '
    ON offers_' || hotel_id || '
    (price)
;
-- Index: search_index_airport


CREATE INDEX IF NOT EXISTS search_index_airport_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, outbound_departure_airport ASC NULLS LAST)
;
-- Index: search_index_hotel

CREATE INDEX IF NOT EXISTS search_index_hotel_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, hotel_id ASC NULLS LAST)
;
-- Index: search_index_mealtype

CREATE INDEX IF NOT EXISTS search_index_mealtype_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, mealtype ASC NULLS LAST)
;
-- Index: search_index_price

CREATE INDEX IF NOT EXISTS search_index_price_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, price ASC NULLS LAST)
;
-- Index: search_index_roomtype

CREATE INDEX IF NOT EXISTS search_index_roomtype_' || hotel_id || '
    ON offers_' || hotel_id || ' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, roomtype ASC NULLS LAST)
;

CREATE INDEX IF NOT EXISTS offer_index_' || hotel_id || '
	ON offers_' || hotel_id || ' USING btree
	(offer_id ASC NULLS LAST)
;

CREATE INDEX IF NOT EXISTS all_index_' || hotel_id || ' ON offers_' || hotel_id || ' USING btree (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, outbound_departure_airport ASC NULLS LAST, mealtype ASC NULLS LAST, roomtype ASC NULLS LAST, oceanview ASC NULLS LAST, DATE_PART(''day'', inbound_departure_date_time - outbound_departure_date_time) ASC NULLS LAST, hotel_id ASC NULLS LAST);
';

    END LOOP;
END $$;

*/



/*
DO $$ DECLARE
    i INTEGER;
BEGIN
    FOR i IN 0..500 LOOP
EXECUTE '
CREATE TABLE IF NOT EXISTS public.search_' || i ||'
(
    offer_id bigint NOT NULL PRIMARY KEY,
    count_adults integer,
    count_children integer,
    inbound_departure_date_time timestamp(6) without time zone NOT NULL,
    mealtype smallint,
    oceanview boolean,
    outbound_departure_airport smallint NOT NULL,
    outbound_departure_date_time timestamp(6) without time zone NOT NULL,
    price double precision,
    roomtype smallint,
    hotel_id bigint NOT NULL,
	duration bigint,
    CONSTRAINT fk9aljdqoi39d35fattfdgp95ac FOREIGN KEY (hotel_id)
        REFERENCES public.hotels (hotel_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT f838248f213ddd4384832fe79fe FOREIGN KEY (offer_id, hotel_id)
	    REFERENCES public.offers (offer_id, hotel_id) MATCH SIMPLE
	    ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT offers_count_adults_check CHECK (count_adults >= 1)
);

ALTER TABLE IF EXISTS public.search_' || i ||'
    OWNER to postgres;
-- Index: airport_index

-- DROP INDEX IF EXISTS public.airport_index;

CREATE INDEX IF NOT EXISTS airport_index_' || i ||'
    ON public.search_' || i ||' USING btree
    (outbound_departure_airport ASC NULLS LAST)
;
-- Index: hotel_index

-- DROP INDEX IF EXISTS public.hotel_index;

CREATE INDEX IF NOT EXISTS hotel_index_' || i ||'
    ON public.search_' || i ||' USING btree
    (hotel_id ASC NULLS LAST)
;
-- Index: price_index

-- DROP INDEX IF EXISTS public.price_index;

CREATE INDEX IF NOT EXISTS price_index_' || i ||'
    ON public.search_' || i ||' USING btree
    (price ASC NULLS LAST)
;
-- Index: search_index_airport

-- DROP INDEX IF EXISTS public.search_index_airport;

CREATE INDEX IF NOT EXISTS search_index_airport_' || i ||'
    ON public.search_' || i ||' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, outbound_departure_airport ASC NULLS LAST)
;
-- Index: search_index_hotel

-- DROP INDEX IF EXISTS public.search_index_hotel;

CREATE INDEX IF NOT EXISTS search_index_hotel_' || i ||'
    ON public.search_' || i ||' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, hotel_id ASC NULLS LAST)
;
-- Index: search_index_mealtype

-- DROP INDEX IF EXISTS public.search_index_mealtype;

CREATE INDEX IF NOT EXISTS search_index_mealtype_' || i ||'
    ON public.search_' || i ||' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, mealtype ASC NULLS LAST)
;
-- Index: search_index_price

-- DROP INDEX IF EXISTS public.search_index_price;

CREATE INDEX IF NOT EXISTS search_index_price_' || i ||'
    ON public.search_' || i ||' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, price ASC NULLS LAST)
;
-- Index: search_index_roomtype

-- DROP INDEX IF EXISTS public.search_index_roomtype;

CREATE INDEX IF NOT EXISTS search_index_roomtype_' || i ||'
    ON public.search_' || i ||' USING btree
    (count_adults ASC NULLS LAST, count_children ASC NULLS LAST, outbound_departure_date_time ASC NULLS LAST, inbound_departure_date_time ASC NULLS LAST, roomtype ASC NULLS LAST)
;

CREATE INDEX IF NOT EXISTS offer_index_' || i ||'
	ON public.search_' || i ||' USING btree
	(offer_id ASC NULLS LAST)
;';
    END LOOP;
END $$;
*/

@Entity
@Data
@NoArgsConstructor
@Table(name = "offers")
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
    private LocalDateTime inboundDepartureDateTime;

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

    private Integer duration;
}
