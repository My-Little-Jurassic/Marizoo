package com.marizoo.user.repository;

import com.marizoo.user.dto.BadgeDto;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.entity.Badge;

import java.util.List;

public interface UserRepositoryCustom {
    List<FavorStoreDto> getFavorStoreList(Long userId);
}
