package de.florian.mallorcaservice.hotels.model.mapper;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-23T13:22:57+0000",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 17.0.6 (Private Build)"
)
public class HotelMapperImpl implements HotelMapper {

    @Override
    public HotelOverviewDTO hotelToHotelOverviewDTO(Hotel hotel) {
        if ( hotel == null ) {
            return null;
        }

        HotelOverviewDTO hotelOverviewDTO = new HotelOverviewDTO();

        hotelOverviewDTO.setHotelId( hotel.getHotelId() );
        hotelOverviewDTO.setHotelName( hotel.getHotelName() );
        hotelOverviewDTO.setImage( hotel.getImage() );
        hotelOverviewDTO.setHotelStars( hotel.getHotelStars() );
        hotelOverviewDTO.setHasPool( hotel.getHasPool() );
        hotelOverviewDTO.setPetsAllowed( hotel.getPetsAllowed() );
        hotelOverviewDTO.setFreeWifi( hotel.getFreeWifi() );

        hotelOverviewDTO.setCloseToBeach( hotel.getDistanceNextBeach() < 2000 );
        hotelOverviewDTO.setCloseToCentre( hotel.getDistanceCentre() < 4000 );
        hotelOverviewDTO.setCloseToAirport( hotel.getDistanceNextAirport() < 20 );

        return hotelOverviewDTO;
    }
}
