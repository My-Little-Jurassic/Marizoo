package com.marizoo.user.api;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseApi {

    private Long id;
    private String uid;
    private String nickname;
}
