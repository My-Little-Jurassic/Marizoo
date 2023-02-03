package com.marizoo.user.api.broadcast_api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Getter
public class OnairApi {
    List<?> onAir = new ArrayList<>();
}
