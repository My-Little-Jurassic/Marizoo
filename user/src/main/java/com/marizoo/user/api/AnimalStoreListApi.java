package com.marizoo.user.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalStoreListApi<T> {

    private int storesCount;
    private T stores;


}
