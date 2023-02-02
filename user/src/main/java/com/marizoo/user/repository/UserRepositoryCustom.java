package com.marizoo.user.repository;

import com.marizoo.user.dto.FavorStoreDto;

import java.util.List;

public interface UserRepositoryCustom {
    List<FavorStoreDto> getFavorStoreList(Long userId);
}
