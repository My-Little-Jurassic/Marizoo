package com.marizoo.user.service;

import com.marizoo.user.entity.User;
import com.marizoo.user.exception.UserNotFoundException;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean isDuplicatedUid(String uid) {
        return !userRepository.findByUid(uid).isPresent();
    }

    public boolean isDuplicatedNickname(String nickname) {
        return !userRepository.findByNickname(nickname).isPresent();
    }

    public String findUidByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email).get();
            return user.getUid();
        } catch (Exception e) {
            throw new UserNotFoundException("이메일에 해당하는 유저가 없습니다.");
        }
    }
}
