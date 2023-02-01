package com.marizoo.user.controller;

import com.marizoo.user.dto.JoinRequestDto;
import com.marizoo.user.entity.User;
import com.marizoo.user.dto.ExceptionResponseDto;
import com.marizoo.user.exception.RefreshTokenException;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.service.AuthService;
import com.marizoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static com.marizoo.user.constant.JwtConstant.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/users")
    public ResponseEntity join(@RequestBody JoinRequestDto joinRequestDto) {
        User user = new User();
        user.setUid(joinRequestDto.getUid());
        user.setPwd(encoder.encode(joinRequestDto.getPwd()));
        user.setNickname(joinRequestDto.getNickname());
        user.setPhoneNumber(joinRequestDto.getPhoneNumber());
        user.setEmail(joinRequestDto.getEmail());
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/refresh")
    public ResponseEntity refresh(@CookieValue(RT_HEADER) String refreshToken, HttpServletResponse response) {
        Map<String, String> tokenMap = authService.refresh(refreshToken);

        response.addHeader(AT_HEADER, tokenMap.get(AT_HEADER));
        if (tokenMap.get(RT_HEADER) != null) {
            // refresh token이 재생성되었으므로 쿠키에 저장하여 보내주어야한다.
            Cookie cookie = new Cookie(RT_HEADER, tokenMap.get(RT_HEADER));
            cookie.setHttpOnly(true);
            cookie.setMaxAge((int) RT_EXP_TIME);
            cookie.setDomain("localhost");  // 나중에 변경해야함 2023-01-30 이성복
            cookie.setPath("/refresh");
            response.addCookie(cookie);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/check-uid")
    public ResponseEntity uidDuplicatedCheck(@RequestParam String uid) {
        return userService.isDuplicatedUid(uid) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpServletResponse.SC_CONFLICT).build();
    }

    // Exception
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(RefreshTokenException.class)
    public ExceptionResponseDto refreshTokenException(RefreshTokenException e) {
        return new ExceptionResponseDto(e.getMessage());
    }
}
