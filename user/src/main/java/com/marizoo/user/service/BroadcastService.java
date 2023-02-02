package com.marizoo.user.service;

import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import com.marizoo.user.entity.FeedVote;
import com.marizoo.user.repository.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BroadcastService {
    private final BroadcastRepository broadcastRepository;

    /**
     * 현재 방송 중인 방송 목록 전체 조회
     * @return onair 방송 목록
     */
    public List<Broadcast> getOnAirs(){
        return broadcastRepository.findByStatus(BroadcastStatus.ONAIR);
    }

    /**
     * broadcast_id에 해당하는 방송 정보 가져오기
     * @param broadcastId : 방송 PK
     * @return 방송 정보 + 방송 출연 동물 정보 + 방송 가게 정보
     */
    public Broadcast getBroadcast(Long broadcastId){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        return opt.orElse(null);
    }

    /**
     * broadcast_id에 해당하는 투표 정보 가져오기
     *
     * @param broadcastId : 방송 PK
     * @return 해당 방송에 해당하는 투표 목록
     */
    public List<FeedVote> getFeedVote(Long broadcastId) {
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        return opt.map(broadcast -> broadcast.getVote().getFeedVoteList()).orElse(null);
    }



}
