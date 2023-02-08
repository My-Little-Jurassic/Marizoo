package com.marizoo.owner.api.request;

import com.marizoo.owner.dto.CreateBroadcastDto;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateBroadcastReq {
    private CreateBroadcastDto broadcastInfo;
    private MultipartFile img;
}
