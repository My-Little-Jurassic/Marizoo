package com.marizoo.user.api;

import com.marizoo.user.dto.FeedVoteDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class FeedVoteApi {
    List<FeedVoteDto> feeds;
}
