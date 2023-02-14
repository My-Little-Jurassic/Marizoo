package com.marizoo.owner.controller;

import com.marizoo.owner.api.request.CreateBroadcastReq;
import com.marizoo.owner.api.request.CreateVoteRequest;
import com.marizoo.owner.api.request.EndVoteRequest;
import com.marizoo.owner.api.response.CreateBroadcastResponse;
import com.marizoo.owner.dto.CreateBroadcastDto;
import com.marizoo.owner.entity.Vote;
import com.marizoo.owner.service.BroadcastService;
import com.marizoo.owner.service.FeedService;
import com.marizoo.owner.service.VoteService;
import io.openvidu.java.client.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/owner/")
public class BroadcastController {
    private final BroadcastService broadcastService;
    private final VoteService voteService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    @ApiOperation(value = "방송 생성하기")
    @PostMapping(value = "/broadcasts", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createBroadcast(@RequestPart CreateBroadcastDto broadcastInfo, @RequestPart MultipartFile img) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("---------------------------------createBroadcast--------------------------------------");
        log.info("title : " + broadcastInfo.getTitle());
        log.info("animal ID List : " + broadcastInfo.getAnimalIdList().toString());
        Map<String, Object> params = null;
        SessionProperties sProperties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(sProperties);
        log.info("session id : " + session.getSessionId());
        Long broadcastId = broadcastService.createBroadcast(broadcastInfo.getTitle(), broadcastInfo.getDescription(),
                session.getSessionId(), broadcastInfo.getAnimalStoreId(), broadcastInfo.getAnimalIdList(), img);
        log.info("------------------------커넥션을 만들어볼게욤---------------------------");
        if (session == null) {
            return new ResponseEntity<>("session이 없습니다.",HttpStatus.NOT_FOUND);
        }
        ConnectionProperties cProperties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(cProperties);
        log.info("------------------------커넥션을 다 만들었어욤---------------------------");

        log.info("-----------------------------------------------------------------------");

        if(broadcastId != null){
            return new ResponseEntity<>(new CreateBroadcastResponse(broadcastId, session.getSessionId(), connection.getToken()), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("방송 생성 실패 :(", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "방송 종료 및 방송에서 진행된 투표 정보 저장")
    @PostMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<String> endBroadcast
            (@PathVariable("broadcast_id") @ApiParam(value = "방송 id", example = "1") Long broadcastId,
             @ApiParam(value = "투표정보") @RequestBody EndVoteRequest endVoteRequest){

        Vote vote = null;
        try {
            vote = voteService.endVote(broadcastId, endVoteRequest.getTitle(), endVoteRequest.getResult());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        try {
            broadcastService.saveEndTime(broadcastId, vote);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("방송 종료", HttpStatus.OK);

    }

}
