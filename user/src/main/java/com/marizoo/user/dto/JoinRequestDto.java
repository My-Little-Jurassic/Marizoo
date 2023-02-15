package com.marizoo.user.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class JoinRequestDto {

    @NotBlank(message = "아이디를 확인해주세요.")
    @Pattern(regexp = "[^a-z0-9] *?", message = "아이디를 확인해주세요.")
    private String uid;

    @NotBlank(message = "비밀번호를 확인해주세요.")
    private String pwd;

    @NotBlank(message = "닉네임를 확인해주세요.")
    private String nickname;

    @NotBlank
    @Pattern(regexp = "^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$", message = "연락처를 확인해주세요.")
    private String phoneNumber;

    @NotBlank(message = "이메일을 확인해주세요.")
    @Email(message = "이메일을 확인해주세요.")
    private String email;
}
