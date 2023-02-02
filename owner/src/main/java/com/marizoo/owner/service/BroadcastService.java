package com.marizoo.owner.service;

import com.marizoo.owner.entity.Broadcast;
import com.marizoo.owner.repository.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BroadcastService {
    private final BroadcastRepository broadcastRepository;

    /**
     * broadcast_id에 해당하는 방송 종료 시간
     * @param broadcastId : 방송 PK
     * @param endTime : 방송 종료 시간
     * @return boolean
     */
    public boolean saveEndTime(Long broadcastId, LocalDateTime endTime){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            return false;
        }
        Broadcast broadcast = opt.get();
        broadcast.setEndTime(endTime);
        broadcastRepository.save(broadcast);
        return true;
    }

    /**
     * broadcast 생성
     * @param broadcast : 방송
     * @return
     */
    public void saveBroadcast(Broadcast broadcast){
        broadcastRepository.save(broadcast);
    }
}
