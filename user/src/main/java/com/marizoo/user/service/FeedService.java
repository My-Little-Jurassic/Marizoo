package com.marizoo.user.service;

import com.marizoo.user.dto.feed_dto.FeedDto;
import com.marizoo.user.entity.Feed;
import com.marizoo.user.repository.feed_repo.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    public List<FeedDto> findFeedListforAnimal(Long animalId){
        List<Feed> feedList = feedRepository.findFeedListFromAnimalId(animalId);
        List<FeedDto> feedDtoList = feedList.stream()
                .map(m -> new FeedDto(
                        m.getName(),
                        m.getImg()
                )).collect(Collectors.toList());

        return feedDtoList;
    }

    public List<FeedDto> findFeedListforSpecies(Long speciesId){
        List<Feed> feedList = feedRepository.findFeedListFromSpeciesId(speciesId);
        List<FeedDto> feedDtoList = feedList.stream()
                .map(m -> new FeedDto(
                        m.getName(),
                        m.getImg()
                )).collect(Collectors.toList());

        return feedDtoList;
    }

}
