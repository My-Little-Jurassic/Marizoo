package com.marizoo.owner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owner/")
public class DeployTest {

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome to the operator service!!!!";
    }


}
