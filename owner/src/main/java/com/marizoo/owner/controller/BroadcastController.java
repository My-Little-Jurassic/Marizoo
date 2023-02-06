package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.CreateBroadcastReq;
import com.marizoo.owner.api.request.CreateVoteRequest;
import com.marizoo.owner.api.request.EndVoteRequest;
import com.marizoo.owner.api.response.CreateBroadcastResponse;
import com.marizoo.owner.service.BroadcastService;
import com.marizoo.owner.service.FeedService;
import com.marizoo.owner.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor

public class BroadcastController {
    private final BroadcastService broadcastService;
    private final VoteService voteService;

    @PostMapping("/broadcasts")
    public ResponseEntity<?> createBroadcast(@RequestBody CreateBroadcastReq createBroadcastReq){
        Long broadcastId = broadcastService.createBroadcast(createBroadcastReq.getBroadcastInfo().getTitle(), createBroadcastReq.getBroadcastInfo().getDescription(), createBroadcastReq.getBroadcastInfo().getThumbnail(),
                createBroadcastReq.getBroadcastInfo().getAnimalStoreId(), createBroadcastReq.getBroadcastInfo().getAnimalIdList());
        if(broadcastId != null){
            return new ResponseEntity<>(broadcastId, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<?> endBroadcast(@PathVariable("broadcast_id") Long broadcastId){
        boolean result = broadcastService.saveEndTime(broadcastId);
        if(result){
            return new ResponseEntity<>("방송 종료 성공", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 종료 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> createVote(@PathVariable("broadcast_id") Long broadcastId, @RequestBody CreateVoteRequest createVoteRequest){
        Long voteId = voteService.createVote(broadcastId, createVoteRequest.getVoteInfo().getTitle(), createVoteRequest.getVoteInfo().getFeedIdList());
        if(voteId != null){
            return new ResponseEntity<>(voteId, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("투표 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> endVote(@PathVariable("broadcast_id") Long broadcastId, @RequestBody EndVoteRequest endVoteRequest){
        voteService.endVote(broadcastId, endVoteRequest.getVoteInfo().getVoteId(),  endVoteRequest.getVoteInfo().getResult());
        return new ResponseEntity<>("투표 종료", HttpStatus.OK);
    }
}
