package com.marizoo.user.service;

import com.marizoo.user.dto.species_dto.SpeciesDto;
import com.marizoo.user.dto.species_dto.SpeciesListDto;
import com.marizoo.user.dto.species_dto.SpeciesWholeDto;
import com.marizoo.user.entity.Species;
import com.marizoo.user.repository.species_repo.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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


    // 종 정보 목록 가져오기
    public List<SpeciesListDto> getSpecies(){
        List<Species> all = speciesRepository.findAll();
        List<SpeciesListDto> findAll = all.stream().map(a -> new SpeciesListDto(a.getId(), a.getClassification(), a.getClassificationImg(), a.getClassificationIcon()))
                .collect(Collectors.toList());
        return findAll;
    }
}
