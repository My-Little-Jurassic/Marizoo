package com.marizoo.user.service;

import com.marizoo.user.api.MyPageRequestApi;
import com.marizoo.user.api.PwdChangeRequestApi;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.MailDto;
import com.marizoo.user.api.MyPageResponseApi;
import com.marizoo.user.entity.User;
import com.marizoo.user.entity.UsersPlay;
import com.marizoo.user.exception.PasswordNotMatchException;
import com.marizoo.user.exception.UserNotFoundException;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.repository.UsersPlayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final UsersPlayRepository usersPlayRepository;
    private final JavaMailSender mailSender;

    private final BCryptPasswordEncoder encoder;

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

    public void createMailAndChangePwd(String email) {
        String tmpPwd = UUID.randomUUID().toString().substring(0, 10);
        MailDto mailDto = new MailDto();
        mailDto.setAddress(email);
        mailDto.setTitle("Marizoo 임시비밀번호 안내 이메일입니다.");
        mailDto.setMessage("안녕하세요. Marizoo입니다. 임시 비밀번호 : " + tmpPwd);

        updatePwd(tmpPwd, email);

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
        try {
            User user = userRepository.findByEmail(email).get();
            user.setPwd(pwd);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException("이메일에 해당하는 유저가 없습니다.");
        }
    }

    public MyPageResponseApi getMyPageInfo(Long userId, String pwd) {
        try {
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
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (PasswordNotMatchException e) {
            throw new PasswordNotMatchException(e.getMessage());
        }
    }

    @Transactional
    public void modifyMyPageInfo(Long userId, MyPageRequestApi myPageRequest) {
        try {
            User user = userRepository.findById(userId).orElseThrow(
                    () -> new UserNotFoundException("유저가 없습니다.")
            );

            user.setNickname(myPageRequest.getNickname());
            user.setPhoneNumber(myPageRequest.getPhoneNumber());
            user.setEmail(myPageRequest.getEmail());

        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        }
    }

    @Transactional
    public void changePwd(Long userId, PwdChangeRequestApi request) {
        try {
            User user = userRepository.findById(userId).orElseThrow(
                    () -> new UserNotFoundException("유저가 없습니다.")
            );

            if (encoder.matches(request.getPastPwd(), user.getPwd())) {
                user.setPwd(encoder.encode(request.getChangePwd()));
            } else {
                throw new PasswordNotMatchException("기존 비밀번호가 일치하지 않습니다.");
            }
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        } catch (PasswordNotMatchException e) {
            throw new PasswordNotMatchException(e.getMessage());
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<FavorStoreDto> getFavorStoreList(Long userId) {
        return userRepository.getFavorStoreList(userId);
    }

    public void deleteBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId).get();
        UsersPlay usersPlay = usersPlayRepository.findById(bookId).get();

        if (usersPlay.getUser().equals(user)) {
            usersPlayRepository.deleteById(bookId);
        }

    }
}