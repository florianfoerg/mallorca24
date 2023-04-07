package de.florian.mallorcaservice.offers.model.mapper;

import de.florian.mallorcaservice.offers.model.Offer;
import de.florian.mallorcaservice.offers.model.OfferDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OfferMapper {

    OfferMapper INSTANCE = Mappers.getMapper(OfferMapper.class);

    @Mapping(source = "hotel.hotelId", target = "hotelId")
    OfferDTO offerToOfferDTO(Offer offer);
}
