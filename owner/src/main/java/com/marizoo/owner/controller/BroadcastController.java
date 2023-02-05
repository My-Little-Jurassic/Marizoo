package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.CreateBroadcastReq;
import com.marizoo.owner.api.response.CreateBroadcastResponse;
import com.marizoo.owner.service.BroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor

public class BroadcastController {
    private final BroadcastService broadcastService;

    @PostMapping("/broadcasts")
    public ResponseEntity<?> createBroadcast(@RequestBody CreateBroadcastReq createBroadcastReq){
        CreateBroadcastResponse result = broadcastService.createBroadcast(createBroadcastReq.getBroadcastInfo().getTitle(), createBroadcastReq.getBroadcastInfo().getDescription(), createBroadcastReq.getBroadcastInfo().getThumbnail(),
                createBroadcastReq.getBroadcastInfo().getAnimalStoreId(), createBroadcastReq.getBroadcastInfo().getAnimalIdList(), createBroadcastReq.getVoteInfo().getTitle(), createBroadcastReq.getVoteInfo().getFeedIdList());
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
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
}
