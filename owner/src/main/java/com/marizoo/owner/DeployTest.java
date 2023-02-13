package com.marizoo.owner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/api/owner/")
public class DeployTest {

    @GetMapping("/welcome")
    public String welcome() throws UnknownHostException {
        InetAddress ipAddress = InetAddress.getLocalHost();
        return String.format("welcome to the operator service!!!!"
                + "my public IP is " + ipAddress);
    }


}
