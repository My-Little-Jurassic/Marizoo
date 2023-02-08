package com.marizoo.owner.service;

import com.marizoo.owner.dto.EndVoteFeedDto;
import com.marizoo.owner.entity.Broadcast;
import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.entity.FeedVote;
import com.marizoo.owner.entity.Vote;
import com.marizoo.owner.repository.BroadcastRepository;
import com.marizoo.owner.repository.FeedRepository;
import com.marizoo.owner.repository.FeedVoteRepository;
import com.marizoo.owner.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final BroadcastRepository broadcastRepository;
    private final VoteRepository voteRepository;
    private final FeedRepository feedRepository;
    private final FeedVoteRepository feedVoteRepository;

    public Long createVote(Long broadcastId, String title, List<Long> feedIdList){
        // feedVoteList 생성 : 투표 옵션 리슽
        List<FeedVote> feedVoteList = new ArrayList<>();
        for (Long aLong : feedIdList) {
            Optional<Feed> optionalFeed = feedRepository.findById(aLong);
            if (optionalFeed.isEmpty()) {
                return null;
            }
            FeedVote feedVote = FeedVote.createFeedVote(optionalFeed.get());
            feedVoteList.add(feedVote);
        }
        // vote 생성
        Vote vote = Vote.createVote(title, feedVoteList);
        voteRepository.save(vote);

        // 방송 find
        Optional<Broadcast> optionalBroadcast = broadcastRepository.findById(broadcastId);
        if(optionalBroadcast.isEmpty()){
            return null;
        }
        // 방송에 vote
        optionalBroadcast.get().setVote(vote);


        return vote.getId();
    }

    public void endVote(Long broadcastId, Long voteId, List<EndVoteFeedDto> endVoteFeedDtoList){
        for (EndVoteFeedDto endVoteFeedDto : endVoteFeedDtoList) {
            FeedVote feedVote = feedVoteRepository.findByVoteIdAndFeedId(voteId, endVoteFeedDto.getFeedId());
            feedVote.setCount(endVoteFeedDto.getCount());
            feedVoteRepository.save(feedVote);
        }
    }
}
