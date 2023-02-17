package com.marizoo.user.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FavorStoreListResponseApi<T> {

    private T stores;
}
