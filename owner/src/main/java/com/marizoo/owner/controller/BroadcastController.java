package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.CreateBroadcastReq;
import com.marizoo.owner.api.request.CreateVoteRequest;
import com.marizoo.owner.api.request.EndVoteRequest;
import com.marizoo.owner.api.response.CreateBroadcastResponse;
import com.marizoo.owner.dto.CreateBroadcastDto;
import com.marizoo.owner.service.BroadcastService;
import com.marizoo.owner.service.FeedService;
import com.marizoo.owner.service.VoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BroadcastController {
    private final BroadcastService broadcastService;
    private final VoteService voteService;

    @ApiOperation(value = "방송 생성하기")
    @PostMapping(value = "/broadcasts", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createBroadcast(@RequestPart CreateBroadcastDto broadcastInfo, @RequestPart MultipartFile img){
        log.info("!!!!!!!!!!!들어왔다");
        log.info("!!!!!!!!!! title : " + broadcastInfo.getTitle());
        log.info("!!!!!!!!!! animal ID List : " + broadcastInfo.getAnimalIdList().toString());
        Long broadcastId = broadcastService.createBroadcast(broadcastInfo.getTitle(), broadcastInfo.getDescription(),
                broadcastInfo.getAnimalStoreId(), broadcastInfo.getAnimalIdList(), img);
        if(broadcastId != null){
            return new ResponseEntity<>(broadcastId, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "방송 종료")
    @PutMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<?> endBroadcast(@PathVariable("broadcast_id") @ApiParam(value = "방송 id", example = "1") Long broadcastId){
        boolean result = broadcastService.saveEndTime(broadcastId);
        if(result){
            return new ResponseEntity<>("방송 종료 성공", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 종료 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation("broadcast_id 방송에 투표 생성하기")
    @PostMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> createVote(@PathVariable("broadcast_id") @ApiParam(value = "방송 id", example = "1") Long broadcastId, @RequestBody CreateVoteRequest createVoteRequest){
        Long voteId = voteService.createVote(broadcastId, createVoteRequest.getVoteInfo().getTitle(), createVoteRequest.getVoteInfo().getFeedIdList());
        if(voteId != null){
            return new ResponseEntity<>(voteId, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("투표 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "broadcast_id에 해당하는 투표 종료하기")
    @PutMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> endVote(@PathVariable("broadcast_id") @ApiParam(value = "방송 id", example = "1") Long broadcastId, @RequestBody EndVoteRequest endVoteRequest){
        voteService.endVote(broadcastId, endVoteRequest.getVoteInfo().getVoteId(),  endVoteRequest.getVoteInfo().getResult());
        return new ResponseEntity<>("투표 종료", HttpStatus.OK);
    }
}
