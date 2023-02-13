package com.marizoo.user.repository.species_repo;

import com.marizoo.user.entity.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SpeciesRepository extends JpaRepository<Species, Long> {

    Species findSpeciesById(Long speciesId);


}
