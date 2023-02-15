package com.marizoo.user.service;

import com.marizoo.user.api.MyPageRequestApi;
import com.marizoo.user.api.MyPageResponseApi;
import com.marizoo.user.api.PwdChangeRequestApi;
import com.marizoo.user.api.WatchEndRequestApi;
import com.marizoo.user.dto.BadgeDto;
import com.marizoo.user.dto.BookDto;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.MailDto;
import com.marizoo.user.entity.Badge;
import com.marizoo.user.entity.User;
import com.marizoo.user.entity.UsersBadge;
import com.marizoo.user.entity.UsersPlay;
import com.marizoo.user.exception.AlreadyJoinException;
import com.marizoo.user.exception.BadgeNotFoundException;
import com.marizoo.user.exception.PasswordNotMatchException;
import com.marizoo.user.exception.UserNotFoundException;
import com.marizoo.user.repository.BadgeRepository;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.repository.UsersBadgeRepository;
import com.marizoo.user.repository.reservation_repo.UsersPlayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.marizoo.user.constant.BadgeCondition.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final UsersPlayRepository usersPlayRepository;
    private final BadgeRepository badgeRepository;
    private final UsersBadgeRepository usersBadgeRepository;

    private final JavaMailSender mailSender;

    private final BCryptPasswordEncoder encoder;

    public boolean isDuplicatedEmail(String email) {
        return userRepository.findByEmail(email).isPresent() == true ? true : false;
    }

    public boolean isDuplicatedUid(String uid) {
        return !userRepository.findByUid(uid).isPresent();
    }

    public boolean isDuplicatedNickname(String nickname) {
        return !userRepository.findByNickname(nickname).isPresent();
    }

    public String findUidByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("이메일에 해당하는 유저가 없습니다.")
        ).getUid();
    }

    public void createMailAndChangePwd(String email) {
        String tmpPwd = UUID.randomUUID().toString().substring(0, 10);
        String encodePwd = encoder.encode(tmpPwd);
        MailDto mailDto = new MailDto();
        mailDto.setAddress(email);
        mailDto.setTitle("Marizoo 임시비밀번호 안내 이메일입니다.");
        mailDto.setMessage("안녕하세요. Marizoo입니다. 임시 비밀번호 : " + tmpPwd);

        updatePwd(encodePwd, email);

        mailSend(mailDto);
    }

    public void mailSend(MailDto mailDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDTO.getAddress());
        message.setSubject(mailDTO.getTitle());
        message.setText(mailDTO.getMessage());
        message.setFrom("보내는 쪽의 메일 주소");
        message.setReplyTo("보내는 쪽의 메일 주소");

        mailSender.send(message);
    }

    @Transactional
    public void updatePwd(String pwd, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("해당하는 유저가 없습니다.")
        );
        user.setPwd(pwd);
    }

    public MyPageResponseApi getMyPageInfo(Long userId, String pwd) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("유저가 없습니다.")
        );

        if (encoder.matches(pwd, user.getPwd())) {
            MyPageResponseApi myPageDto = new MyPageResponseApi();

            myPageDto.setUid(user.getUid());
            myPageDto.setNickname(user.getNickname());
            myPageDto.setPhoneNumber(user.getPhoneNumber());
            myPageDto.setEmail(user.getEmail());

            return myPageDto;
        } else {
            throw new PasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }
    }

    @Transactional
    public void modifyMyPageInfo(Long userId, MyPageRequestApi myPageRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("유저가 없습니다.")
        );

        if (userRepository.findByNickname(myPageRequest.getNickname()).isPresent()) {
            throw new AlreadyJoinException("이미 존재하는 닉네임입니다.");
        }

        if (userRepository.findByEmail(myPageRequest.getEmail()).isPresent()) {
            throw new AlreadyJoinException("이미 존재하는 이메일입니다.");
        }

        user.setNickname(myPageRequest.getNickname());
        user.setPhoneNumber(myPageRequest.getPhoneNumber());
        user.setEmail(myPageRequest.getEmail());
    }

    @Transactional
    public void changePwd(Long userId, PwdChangeRequestApi request) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("유저가 없습니다.")
        );

        if (encoder.matches(request.getPastPwd(), user.getPwd())) {
            user.setPwd(encoder.encode(request.getChangePwd()));
        } else {
            throw new PasswordNotMatchException("기존 비밀번호가 일치하지 않습니다.");
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<FavorStoreDto> getFavorStoreList(Long userId) {
        return userRepository.getFavorStoreList(userId);
    }

    @Transactional
    public void deleteBook(Long userId, Long bookId) {
        User user = userRepository.getBookList(userId);
        for (UsersPlay usersPlay : user.getBookList()) {
            if (usersPlay.getId() == bookId) {
                usersPlayRepository.deleteById(bookId);
            }
        }
//        User user = userRepository.findById(userId).get();
//        UsersPlay usersPlay = usersPlayRepository.findById(bookId).get();
//
//        if (usersPlay.getUser().equals(user)) {
//            usersPlayRepository.delete(usersPlay);
//        }
    }

    /**
     * 배지 획득
     */
    @Transactional
    public void addBadge(Long userId, Long badgeId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("해당하는 유저가 없습니다.")
        );
        Badge badge = badgeRepository.findById(badgeId).orElseThrow(
                () -> new BadgeNotFoundException("해당하는 배지가 없습니다.")
        );

        UsersBadge usersBadge = UsersBadge.createUsersBadge(badge);
        user.addBadge(usersBadge);
    }

    @Transactional
    public void bulkAddBadge(List<Long> userIdList, Long badgeId) {
        int effectedRowCnt = usersBadgeRepository.bulkAddBadge(userIdList, badgeId);
    }

    public List<BadgeDto> getBadgeList(Long userId) {
        User user = userRepository.getBadgeList(userId);
        List<BadgeDto> badgeDtoList = new ArrayList<>();
        for (UsersBadge usersBadge : user.getBadgeList()) {
            badgeDtoList.add(new BadgeDto(
                    usersBadge.getBadge().getImg(),
                    usersBadge.getBadge().getBadgeType(),
                    usersBadge.getBadge().getDescription())
            );
        }
        return badgeDtoList;
    }

    @Transactional
    public void updateCountAndWatchTimeAcc(WatchEndRequestApi watchEndRequestApi) {
        User user = userRepository.findById(watchEndRequestApi.getUserId()).get();

        // 배지 획득 조건 달성 체크
        Long plusWatchTime = user.getWatchTimeAcc();
        for (int i = 1; i <= watchEndRequestApi.getWatchTime(); i++) {
            plusWatchTime += i;
            if (watch.containsKey(plusWatchTime)) {
                Badge badge = badgeRepository.findById(watch.get(plusWatchTime)).orElseThrow(
                        () -> new BadgeNotFoundException("해당하는 배지가 없습니다.")
                );
                UsersBadge.createUsersBadge(badge);
            }
        }

        user.setWatchTimeAcc(plusWatchTime);

        Long plusEffectClick = user.getEffectClickAcc();
        for (int i = 1; i <= watchEndRequestApi.getEffectCount(); i++) {
            plusEffectClick += i;
            if (effect.containsKey(plusEffectClick)) {
                Badge badge = badgeRepository.findById(effect.get(plusEffectClick)).orElseThrow(
                        () -> new BadgeNotFoundException("해당하는 배지가 없습니다.")
                );
                UsersBadge.createUsersBadge(badge);
            }
        }

        user.setEffectClickAcc(plusEffectClick);

        Long plusFeedClick = user.getFeedClickAcc();
        for (int i = 1; i <= watchEndRequestApi.getFeedCount(); i++) {
            plusFeedClick += i;
            if (feed.containsKey(plusFeedClick)) {
                Badge badge = badgeRepository.findById(feed.get(plusFeedClick)).orElseThrow(
                        () -> new BadgeNotFoundException("해당하는 배지가 없습니다.")
                );
                UsersBadge.createUsersBadge(badge);
            }
        }

        user.setFeedClickAcc(plusFeedClick);
    }

    public List<BookDto> getBookList(Long userId) {
        User user = userRepository.getBookList(userId);
        List<BookDto> bookDtoList = new ArrayList<>();
        for (UsersPlay usersPlay : user.getBookList()) {
            bookDtoList.add(new BookDto(
                    usersPlay.getId(),
                    usersPlay.getPlay().getPlayDateTime(),
                    usersPlay.getTotalVisitor(),
                    usersPlay.getPlay().getAnimalStore().getStoreName(),
                    usersPlay.getPlay().getAnimalStore().getTel(),
                    usersPlay.getPlay().getImg(),
                    usersPlay.getStatus(),
                    usersPlay.getPlay().getTitle(),
                    usersPlay.getPlay().getAnimalStore().getId()
            ));
        }
        return bookDtoList;
    }
}