package com.marizoo.user.repository;

import com.marizoo.user.dto.BadgeDto;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.Badge;
import com.marizoo.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    List<FavorStoreDto> getFavorStoreList(Long userId);

    User getBadgeList(Long userId);
}
