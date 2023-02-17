package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    @Query("select distinct f from Feed f join f.animalFeeds af where af.animal.id in :animalIdList")
    List<Feed> findFeedListFromAnimalId(@Param("animalIdList") List<Long> animalIdList);


}
