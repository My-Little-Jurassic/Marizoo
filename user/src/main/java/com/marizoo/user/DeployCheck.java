package com.marizoo.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/api/user/")
@Slf4j
public class DeployCheck {

    @GetMapping("/welcome")
    public String welcome() throws UnknownHostException {
        log.info("배포 health-check");
        InetAddress ipAddress = InetAddress.getLocalHost();
        return String.format("welcome to the user service!!   "
            + "my ip is " + ipAddress);
    }
}
