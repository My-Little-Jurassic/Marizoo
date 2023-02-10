package com.marizoo.user.controller;

import com.marizoo.user.api.animalstore_api.AnimalListResponse;
import com.marizoo.user.api.animalstore_api.SpeciesListResponse;
import com.marizoo.user.dto.SpeciesAnimalsDto;
import com.marizoo.user.dto.species_dto.SpeciesListDto;
import com.marizoo.user.repository.species_repo.SpeciesRepository;
import com.marizoo.user.service.AnimalService;
import com.marizoo.user.service.SpeciesService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/")
public class SpeciesController {
    private final SpeciesService speciesService;
    private final AnimalService animalService;

    @ApiOperation(value = "종 목록 가져오기")
    @GetMapping("/species")
    public ResponseEntity<?> getSpecies(){
        List<SpeciesListDto> species = speciesService.getSpecies();
        if(species.isEmpty()){
            return new ResponseEntity<>("종 없음", HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(new SpeciesListResponse<List<SpeciesListDto>>(species), HttpStatus.OK);
        }
    }

    @ApiOperation(value = "종이 species_id인 동물 목록 가져오기 ")
    @GetMapping("/species/{species_id}")
    public ResponseEntity<?> getSpeciesAnimals(@PathVariable("species_id") @ApiParam(value = "종 id", example = "1") Long speciesId){
        List<SpeciesAnimalsDto> speciesAnimals = animalService.getSpeciesAnimals(speciesId);
        if(speciesAnimals.isEmpty()){
            return new ResponseEntity<>("종에 해당하는 동물 없음", HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(new AnimalListResponse<List<SpeciesAnimalsDto>>(speciesAnimals), HttpStatus.OK);
        }
    }

}
