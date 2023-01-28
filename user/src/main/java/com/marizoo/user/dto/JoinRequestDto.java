package com.marizoo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRequestDto {

    private String uid;
    private String pwd;
    private String nickname;
    private String phoneNumber;
    private String email;
}
