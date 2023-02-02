package com.marizoo.user.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PwdChangeRequestApi {

    private String pastPwd;
    private String changePwd;
}
