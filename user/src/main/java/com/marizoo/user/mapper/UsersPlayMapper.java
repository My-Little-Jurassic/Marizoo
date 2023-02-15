package com.marizoo.user.mapper;

import com.marizoo.user.dto.BookDto;
import com.marizoo.user.entity.UsersPlay;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UsersPlayMapper {

    UsersPlayMapper INSTANCE = Mappers.getMapper(UsersPlayMapper.class);

    @Mapping(source = "play.playDateTime", target = "playDateTime")
    @Mapping(source = "play.animalStore.storeName", target = "storeName")
    @Mapping(source = "play.animalStore.tel", target = "tel")
    @Mapping(source = "play.img", target = "img")
    @Mapping(source = "play.title", target = "playTitle")
    @Mapping(source = "play.animalStore.id", target = "storeId")
    List<BookDto> toDto(List<UsersPlay> usersPlayList);
}
