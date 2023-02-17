package com.marizoo.owner.controller;

import com.marizoo.owner.api.BulkBadgeRequestApi;
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

        // params를 null로 넣어주면 sessionId를 랜덤하게 생성해 session을 만들어줌
        Map<String, Object> params = null;
        SessionProperties sProperties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(sProperties);
        log.info("session id : " + session.getSessionId());

        // 방송 생성
        Long broadcastId = broadcastService.createBroadcast(broadcastInfo.getTitle(), broadcastInfo.getDescription(),
                session.getSessionId(), broadcastInfo.getAnimalStoreId(), broadcastInfo.getAnimalIdList(), img);

        // 커넥션 생성
        log.info("------------------------커넥션을 만들어볼게욤---------------------------");
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
    public ResponseEntity<?> endBroadcast
            (@PathVariable("broadcast_id") @ApiParam(value = "방송 id", example = "1") Long broadcastId,
             @ApiParam(value = "투표정보") @RequestBody EndVoteRequest endVoteRequest){
        Vote vote = null;
        log.info("------------------------endBroadcast--------------------------");
        log.info("endVoteRequest.getResult() : " + endVoteRequest.getResult());
        if(!endVoteRequest.getResult().isEmpty()){
            vote = voteService.endVote(broadcastId, endVoteRequest.getTitle(), endVoteRequest.getResult());
        }
        try {
            broadcastService.endBroadcast(broadcastId, vote);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
        }

        return new ResponseEntity<>("방송 종료", HttpStatus.OK);

    }

    @PostMapping("/broadcasts/badges")
    public ResponseEntity addBadgeAtRelatedUsers(@RequestBody BulkBadgeRequestApi bulkBadgeRequest) {
        broadcastService.bulkAddBadge(bulkBadgeRequest.getUserIdList(), bulkBadgeRequest.getBadgeId());
        return ResponseEntity.ok().build();
    }

}
