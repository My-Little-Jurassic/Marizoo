package com.marizoo.user.service;

import com.marizoo.user.dto.species_dto.SpeciesDto;
import com.marizoo.user.dto.species_dto.SpeciesWholeDto;
import com.marizoo.user.entity.Species;
import com.marizoo.user.repository.species_repo.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SpeciesService {
    private final SpeciesRepository speciesRepository;

    public SpeciesDto findSpeciesInfo(Long speciesId){
        Species species = speciesRepository.findSpeciesById(speciesId);
        SpeciesDto speciesDto = new SpeciesDto(
                species.getHabitat(),
                species.getClassification(),
                species.getLifeSpan(),
                species.getInfo());

        return speciesDto;
    }

    public SpeciesWholeDto findSpeciesDetail(Long animalId){
        Species species = speciesRepository.findSpeciesByAnimalId(animalId);
        SpeciesWholeDto speciesWholeDto = new SpeciesWholeDto(
                species.getId(),
                species.getHabitat(),
                species.getClassification(),
                species.getLifeSpan(),
                species.getInfo(),
                species.getClassificationImg()
        );
        return speciesWholeDto;
    }
}
