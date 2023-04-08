package de.florian.mallorcaservice.hotels.model.mapper;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HotelMapper {

    HotelMapper INSTANCE = Mappers.getMapper(HotelMapper.class);

    @Mappings({
            @Mapping(expression = "java(hotel.getDistanceNextBeach() < 2000)", target = "closeToBeach"),
            @Mapping(expression = "java(hotel.getDistanceCentre() < 4000)", target = "closeToCentre"),
            @Mapping(expression = "java(hotel.getDistanceNextAirport() < 20)", target = "closeToAirport")
    })
    HotelOverviewDTO hotelToHotelOverviewDTO(Hotel hotel);
}
