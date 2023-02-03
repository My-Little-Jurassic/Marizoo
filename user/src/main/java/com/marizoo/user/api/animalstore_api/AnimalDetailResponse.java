package com.marizoo.user.api.animalstore_api;

import com.marizoo.user.dto.animal_dto.AnimalDto;
import com.marizoo.user.dto.animalstore_dto.StoreSubDto;
import com.marizoo.user.dto.feed_dto.FeedDto;
import com.marizoo.user.dto.species_dto.SpeciesWholeDto;
import com.marizoo.user.entity.Animal;
import com.marizoo.user.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AnimalDetailResponse {

    private AnimalDto animalInfo;
    private StoreSubDto storeInfo;
    private SpeciesWholeDto speciesInfo;
    private List<FeedDto> feeds;
}
