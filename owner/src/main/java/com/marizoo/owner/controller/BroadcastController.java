package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.CreateBroadcastReq;
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
        Long result = broadcastService.createBroadcast(createBroadcastReq.getTitle(), createBroadcastReq.getDescription(), createBroadcastReq.getThumbnail(),
                createBroadcastReq.getAnimalStoreId(), createBroadcastReq.getAnimalIdList(), createBroadcastReq.getVoteId());
        if(result != 1L){
            return new ResponseEntity<>("방송 생성 성공", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<?> endBroadcast(@PathVariable("broadcast_id") Long broadcastId, @RequestBody LocalDateTime endTime){
        boolean result = broadcastService.saveEndTime(broadcastId, endTime);
        if(result){
            return new ResponseEntity<>("방송 종료 성공", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 종료 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }
}
