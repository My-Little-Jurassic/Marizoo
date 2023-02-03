package com.marizoo.user.repository.feed_repo;

import com.marizoo.user.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    @Query("select f from Feed f join f.animalFeeds af where af.animal.id = :animalId")
    List<Feed> findFeedListFromAnimalId(@Param("animalId") Long animalId);

    @Query("select f from Feed f join f.speciesFeeds sf where sf.species.id = :speciesId")
    List<Feed> findFeedListFromSpeciesId(@Param("speciesId") Long speciesId);
}
