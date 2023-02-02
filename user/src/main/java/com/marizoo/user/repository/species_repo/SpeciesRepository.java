package com.marizoo.user.repository.species_repo;

import com.marizoo.user.entity.Species;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepository extends JpaRepository<Species, Long> {

    Species findSpeciesById(Long speciesId);

}
