package com.marizoo.user.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MyPageBadgeListResponseApi<T> {

    private T badges;
}
