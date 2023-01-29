package com.marizoo.user.controller;

import com.marizoo.user.dto.BroadcastDto;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.repository.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BroadcastController {
    private final BroadcastRepository broadcastRepository;

    @GetMapping("/broadcasts")
    public ResponseEntity<?> getOnairs(){
        List<Broadcast> onairs = broadcastRepository.findOnairs();

        List<BroadcastDto> result = onairs.stream()
                .map(b -> new BroadcastDto(b.getTitle(), b.getThumbnail(), b.getAnimalStore()))
                .collect(Collectors.toList());
        return new ResponseEntity<List<BroadcastDto>>(result, HttpStatus.OK);
    }
}
