package de.florian.mallorcaservice.offers.model.mapper;

import de.florian.mallorcaservice.hotels.model.HotelOverviewDTO;
import de.florian.mallorcaservice.offers.model.Offer;
import de.florian.mallorcaservice.offers.model.OfferDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OfferMapper {

    OfferMapper INSTANCE = Mappers.getMapper(OfferMapper.class);

    @Mapping(source = "hotel.hotelId", target = "hotelId")
    OfferDTO offerToOfferDTO(Offer offer);

    @Mappings({
            @Mapping(source = "hotel.hotelId", target = "hotelId"),
            @Mapping(source = "hotel.hotelName", target = "hotelName"),
            @Mapping(source = "hotel.hotelStars", target = "hotelStars"),
            @Mapping(source = "price", target = "minPrice"),
            @Mapping(source = "hotel.image", target = "image"),
            @Mapping(source = "hotel.hasPool", target = "hasPool"),
            @Mapping(source = "hotel.freeWifi", target = "freeWifi"),
            @Mapping(source = "hotel.petsAllowed", target = "petsAllowed"),
            @Mapping(expression = "java(offer.getHotel().getDistanceNextBeach() < 2000)", target = "closeToBeach"),
            @Mapping(expression = "java(offer.getHotel().getDistanceCentre() < 4000)", target = "closeToCentre"),
            @Mapping(expression = "java(offer.getHotel().getDistanceNextAirport() < 20)", target = "closeToAirport")
    })
    HotelOverviewDTO offerToHotelOverviewDTO(Offer offer);
}
