package com.marizoo.owner.service;

import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;

    public List<Feed> findFeedListforAnimals(List<Long>animalIdList){
        return feedRepository.findFeedListFromAnimalId(animalIdList);
    }
}
