package com.marizoo.user.controller;

import com.marizoo.user.api.*;
import com.marizoo.user.dto.BookDto;
import com.marizoo.user.dto.BadgeDto;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.JoinRequestDto;
import com.marizoo.user.entity.Badge;
import com.marizoo.user.entity.User;
import com.marizoo.user.dto.ExceptionResponseDto;
import com.marizoo.user.entity.UsersPlay;
import com.marizoo.user.entity.UsersBadge;
import com.marizoo.user.exception.AlreadyJoinException;
import com.marizoo.user.exception.PasswordNotMatchException;
import com.marizoo.user.exception.RefreshTokenException;
import com.marizoo.user.exception.UserNotFoundException;
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
import java.util.ArrayList;
import java.util.List;
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

        if (userRepository.findByEmail(joinRequestDto.getEmail()).isPresent()) {
            throw new AlreadyJoinException("이미 가입된 이메일입니다.");
        }

        User user = new User();
        user.setUid(joinRequestDto.getUid());
        user.setPwd(encoder.encode(joinRequestDto.getPwd()));
        user.setNickname(joinRequestDto.getNickname());
        user.setPhoneNumber(joinRequestDto.getPhoneNumber());
        user.setEmail(joinRequestDto.getEmail());
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.status(HttpServletResponse.SC_CREATED).build();
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

    @GetMapping("/users/check-nickname")
    public ResponseEntity nicknameDuplicatedCheck(@RequestParam String nickname) {
        return userService.isDuplicatedNickname(nickname) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpServletResponse.SC_CONFLICT).build();
    }

    @GetMapping("/users/find-uid")
    public ResponseEntity findUidByEmail(@RequestParam String email) {
        String uid = userService.findUidByEmail(email);
        return ResponseEntity.ok(new FindUidResponseApi(uid));
    }

    @GetMapping("/users/find-pwd")
    public ResponseEntity findPwdByEmail(@RequestParam String email) {
        userService.createMailAndChangePwd(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity myPage(@RequestBody Map<String, String> request, @PathVariable Long userId) {
        String pwd = request.get("pwd");
        MyPageResponseApi myPageInfo = userService.getMyPageInfo(userId, pwd);
        return ResponseEntity.ok(myPageInfo);
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity modifyMyPage(@RequestBody MyPageRequestApi myPageRequest, @PathVariable Long userId) {
        userService.modifyMyPageInfo(userId, myPageRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{userId}/change-pwd")
    public ResponseEntity changePwd(@RequestBody PwdChangeRequestApi request, @PathVariable Long userId) {
        userService.changePwd(userId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/stores")
    public ResponseEntity getFavorStoreList(@PathVariable Long userId) {
        List<FavorStoreDto> favorStoreList = userService.getFavorStoreList(userId);
        return ResponseEntity.ok(new FavorStoreListResponseApi(favorStoreList));
    }

    @GetMapping("/users/{userId}/books")
    public ResponseEntity getBookList(@PathVariable Long userId) {
        User user = userRepository.findById(userId).get();
        List<UsersPlay> bookList = user.getBookList();
        List<BookDto> bookDtoList = new ArrayList<>();
        for (UsersPlay usersPlay : bookList) {
            bookDtoList.add(new BookDto(
                    usersPlay.getId(),
                    usersPlay.getPlay().getPlayDateTime(),
                    usersPlay.getTotalVisitor(),
                    usersPlay.getPlay().getAnimalStore().getStoreName(),
                    usersPlay.getPlay().getAnimalStore().getTel())
            );
        }
        return ResponseEntity.ok(new BookListResponseApi(bookDtoList));
    }

    @DeleteMapping("users/{userId}/books/{book_id}")
    public ResponseEntity deleteBook(@PathVariable Long userId, @PathVariable Long bookId) {
        userService.deleteBook(userId, bookId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/broadcasts/badges")
    public ResponseEntity addBadgeAtRelatedUsers(@RequestBody BulkBadgeRequestApi bulkBadgeRequest) {
        userService.bulkAddBadge(bulkBadgeRequest.getUserIdList(), bulkBadgeRequest.getBadgeId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/badges")
    public ResponseEntity getBadgeList(@PathVariable Long userId) {
        List<BadgeDto> badgeList = userService.getBadgeList(userId);
        return ResponseEntity.ok(new MyPageBadgeListResponseApi(badgeList));
    }

    @PutMapping("/users/watchEnd")
    public ResponseEntity updateCountAndWatchTimeAcc(@RequestBody WatchEndRequestApi watchEndRequestApi) {
        userService.updateCountAndWatchTimeAcc(watchEndRequestApi);
        return ResponseEntity.ok().build();
    }

    // Exception
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(RefreshTokenException.class)
    public ExceptionResponseDto refreshTokenException(RefreshTokenException e) {
        return new ExceptionResponseDto(e.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(AlreadyJoinException.class)
    public ExceptionResponseDto alreadyJoinException(AlreadyJoinException e) {
        return new ExceptionResponseDto(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException.class)
    public ExceptionResponseDto userNotFoundException(UserNotFoundException e) {
        return new ExceptionResponseDto(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(PasswordNotMatchException.class)
    public ExceptionResponseDto passwordNotMatchException(PasswordNotMatchException e) {
        return new ExceptionResponseDto(e.getMessage());
    }
}
