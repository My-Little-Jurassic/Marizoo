package com.marizoo.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/")
public class DeployCheck {

    @GetMapping("/welcome")
    public String welcome(){
        return "welcome to the user service!!!!!!";
    }
}
