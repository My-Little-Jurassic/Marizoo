package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.AnimalFeedRequest;
import com.marizoo.owner.api.response.FeedListResponse;
import com.marizoo.owner.dto.FeedDto;
import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.service.FeedService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class AnimalController {
    private final FeedService feedService;

    @ApiOperation(value = "동물이 선호하는 먹이 목록 가져오기")
    @PostMapping("/broadcasts/feeds")
    public ResponseEntity<?> getFeedListforAnimals(@RequestBody AnimalFeedRequest animalFeedRequest) {
        List<Feed> animalFeedList = feedService.findFeedListforAnimals(animalFeedRequest.getAnimalIdList());
        List<FeedDto> result = animalFeedList.stream().map(af -> new FeedDto(af.getId(), af.getName(), af.getImg())).collect(Collectors.toList());
        return new ResponseEntity<>(new FeedListResponse(result), HttpStatus.OK);
    }
}
