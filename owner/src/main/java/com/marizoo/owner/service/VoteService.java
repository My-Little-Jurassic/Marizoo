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
    private final VoteRepository voteRepository;
    private final FeedRepository feedRepository;

    public Vote endVote(Long broadcastId, String title, List<EndVoteFeedDto> endVoteFeedDtoList){
        // 투표 옵션 먹이 리스트
        List<FeedVote> feedVoteList = new ArrayList<>();
        for (EndVoteFeedDto endVoteFeedDto : endVoteFeedDtoList) {
            Feed feed = feedRepository.findById(endVoteFeedDto.getFeedId()).orElseThrow(
                    () -> new RuntimeException("먹이가 없습니다")
            );
            FeedVote feedVote = FeedVote.createFeedVote(feed, endVoteFeedDto.getCount());
            feedVoteList.add(feedVote);
        }
        // 투표 생성
        Vote vote = Vote.createVote(title, feedVoteList);
        voteRepository.save(vote);
        return vote;
    }
}
