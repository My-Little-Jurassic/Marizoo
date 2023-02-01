package com.marizoo.user.service;

import com.marizoo.user.dto.MailDto;
import com.marizoo.user.entity.User;
import com.marizoo.user.exception.UserNotFoundException;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

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
        } catch (Exception e) {
            throw new UserNotFoundException("이메일에 해당하는 유저가 없습니다.");
        }
    }
}
