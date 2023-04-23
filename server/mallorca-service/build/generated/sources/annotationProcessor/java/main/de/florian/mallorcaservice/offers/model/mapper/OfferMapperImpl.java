package de.florian.mallorcaservice.offers.model.mapper;

import de.florian.mallorcaservice.hotels.model.Hotel;
import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.offers.model.Offer;
import de.florian.mallorcaservice.offers.model.OfferDTO;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-23T13:22:57+0000",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 17.0.6 (Private Build)"
)
public class OfferMapperImpl implements OfferMapper {

    @Override
    public OfferDTO offerToOfferDTO(Offer offer) {
        if ( offer == null ) {
            return null;
        }

        OfferDTO offerDTO = new OfferDTO();

        offerDTO.setHotelId( offerHotelHotelId( offer ) );
        offerDTO.setOfferId( offer.getOfferId() );
        offerDTO.setInboundDepartureDateTime( offer.getInboundDepartureDateTime() );
        offerDTO.setOutboundDepartureDateTime( offer.getOutboundDepartureDateTime() );
        offerDTO.setPrice( offer.getPrice() );
        offerDTO.setCountAdults( offer.getCountAdults() );
        offerDTO.setCountChildren( offer.getCountChildren() );
        offerDTO.setOutboundDepartureAirport( offer.getOutboundDepartureAirport() );
        offerDTO.setMealtype( offer.getMealtype() );
        offerDTO.setOceanview( offer.getOceanview() );
        offerDTO.setRoomtype( offer.getRoomtype() );

        return offerDTO;
    }

    @Override
    public HotelOverviewDTO offerToHotelOverviewDTO(Offer offer) {
        if ( offer == null ) {
            return null;
        }

        HotelOverviewDTO hotelOverviewDTO = new HotelOverviewDTO();

        hotelOverviewDTO.setHotelId( offerHotelHotelId( offer ) );
        hotelOverviewDTO.setHotelName( offerHotelHotelName( offer ) );
        hotelOverviewDTO.setHotelStars( offerHotelHotelStars( offer ) );
        hotelOverviewDTO.setMinPrice( offer.getPrice() );
        hotelOverviewDTO.setImage( offerHotelImage( offer ) );
        hotelOverviewDTO.setHasPool( offerHotelHasPool( offer ) );
        hotelOverviewDTO.setFreeWifi( offerHotelFreeWifi( offer ) );
        hotelOverviewDTO.setPetsAllowed( offerHotelPetsAllowed( offer ) );

        hotelOverviewDTO.setCloseToBeach( offer.getHotel().getDistanceNextBeach() < 2000 );
        hotelOverviewDTO.setCloseToCentre( offer.getHotel().getDistanceCentre() < 4000 );
        hotelOverviewDTO.setCloseToAirport( offer.getHotel().getDistanceNextAirport() < 20 );

        return hotelOverviewDTO;
    }

    private Long offerHotelHotelId(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Long hotelId = hotel.getHotelId();
        if ( hotelId == null ) {
            return null;
        }
        return hotelId;
    }

    private String offerHotelHotelName(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        String hotelName = hotel.getHotelName();
        if ( hotelName == null ) {
            return null;
        }
        return hotelName;
    }

    private Integer offerHotelHotelStars(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Integer hotelStars = hotel.getHotelStars();
        if ( hotelStars == null ) {
            return null;
        }
        return hotelStars;
    }

    private String offerHotelImage(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        String image = hotel.getImage();
        if ( image == null ) {
            return null;
        }
        return image;
    }

    private Boolean offerHotelHasPool(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Boolean hasPool = hotel.getHasPool();
        if ( hasPool == null ) {
            return null;
        }
        return hasPool;
    }

    private Boolean offerHotelFreeWifi(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Boolean freeWifi = hotel.getFreeWifi();
        if ( freeWifi == null ) {
            return null;
        }
        return freeWifi;
    }

    private Boolean offerHotelPetsAllowed(Offer offer) {
        if ( offer == null ) {
            return null;
        }
        Hotel hotel = offer.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Boolean petsAllowed = hotel.getPetsAllowed();
        if ( petsAllowed == null ) {
            return null;
        }
        return petsAllowed;
    }
}
