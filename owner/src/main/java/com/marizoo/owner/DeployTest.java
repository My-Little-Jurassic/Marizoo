package com.marizoo.owner;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/operator/")
public class DeployTest {

    @GetMapping("/welcome")
    public String welcome(){
        return "welcome to the operator service!!!!";
    }
}
