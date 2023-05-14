package de.florian.mallorcaservice.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import de.florian.mallorcaservice.offers.model.Airport;
import de.florian.mallorcaservice.offers.model.Mealtype;
import de.florian.mallorcaservice.offers.model.Roomtype;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class FilteredRequest {
        private List<RequestFilter> filter;
        private List<Roomtype> roomtypes;
        private List<Mealtype> mealtypes;
        private Integer countAdults;
        private Integer countChildren;
        private List<Airport> departureAirports;

        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime earliestPossible;

        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime latestPossible;

        private Integer duration;
        private Double maxPrice;
        private Boolean oceanview;
        private Integer minStars;
        private Boolean hasPool;

        private static String enumListToString(List<? extends Enum<?>> list ) {
                if(list == null || list.size() == 0) {
                        return "( null )";
                }

                StringBuilder values = new StringBuilder();

                for (Enum<?> i:list) {
                        values.append(",").append(i.ordinal());
                }

                return "(" + values.substring(1) + ")";
        }

        public String getAirportsString() {
                return enumListToString(departureAirports);
        }

        public String getMealtypesString() {
                return enumListToString(mealtypes);
        }

        public String getRoomtypesString() {
                return enumListToString(roomtypes);
        }
}
