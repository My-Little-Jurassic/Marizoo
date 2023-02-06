package com.marizoo.user.service;

import com.marizoo.user.dto.broadcast_dto.SearchBroadcastDto;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastAnimal;
import com.marizoo.user.entity.BroadcastStatus;
import com.marizoo.user.entity.FeedVote;
import com.marizoo.user.repository.broadcast_repo.BroadcastRepository;
import com.marizoo.user.repository.broadcast_repo.BroadcastRepositoryCustomImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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

    /**
     * input에 해당하는 종이 출연하는 라이브 방송
     *
     * @param input : 검색어(종)
     * @return 라이브 방송 중 검색어 종이 출연하는 방송 목록
     */
    public List<SearchBroadcastDto> searchOnAirsHavingSpeciesList(String input){
        String keyword = "%" + input + "%";
        List<SearchBroadcastDto> searchSpecies = broadcastRepository.searchOnAirsHavingSpecies(keyword);
        return searchSpecies;
    }

    /**
     * classifications에 해당하는 종이 출연하는 라이브 방송
     *
     * @param broadcastId : 방송 PK
     * @return 라이브 방송 중 종 리스트에 있는 종이 출연하는 방송 목록
     */
    public List<SearchBroadcastDto> searchBroadcastRelated(Long broadcastId){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            // error
            return null;
        }
        List<String> classifications = new ArrayList<>();
        List<BroadcastAnimal> broadcastAnimalList = opt.get().getBroadcastAnimalList();
        for (BroadcastAnimal broadcastAnimal : broadcastAnimalList) {
            classifications.add(broadcastAnimal.getClassification());
        }

        List<SearchBroadcastDto> relateBroadcastList = broadcastRepository.searchBroadcastRelated(classifications);
        return relateBroadcastList;
    }

}
