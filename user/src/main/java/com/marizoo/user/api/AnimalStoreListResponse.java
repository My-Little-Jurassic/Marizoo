package com.marizoo.user.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalStoreListResponse<T> {

// 리스트의 수 반환시 사용.
//    private int storesCount;
    private T stores;


}
