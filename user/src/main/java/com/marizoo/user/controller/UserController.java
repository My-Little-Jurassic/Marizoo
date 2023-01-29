package com.marizoo.user.controller;

import com.marizoo.user.dto.JoinRequestDto;
import com.marizoo.user.dto.JoinResponseDto;
import com.marizoo.user.entity.User;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;

    @PostMapping("/users")
    public ResponseEntity<JoinResponseDto> join(@RequestBody @Validated JoinRequestDto joinRequestDto) {
        User user = new User();
        user.setUid(joinRequestDto.getUid());
        user.setPwd(encoder.encode(joinRequestDto.getPwd()));
        user.setNickname(joinRequestDto.getNickname());
        user.setPhoneNumber(joinRequestDto.getPhoneNumber());
        user.setEmail(joinRequestDto.getEmail());
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok(new JoinResponseDto("Success"));
    }
}
