package com.marizoo.user.api.animalstore_api;

import com.marizoo.user.dto.feed_dto.FeedDto;
import com.marizoo.user.dto.species_dto.SpeciesDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SpeciesDetailResponse {

    private SpeciesDto speciesInfo;
    private List<FeedDto> feeds;

}
