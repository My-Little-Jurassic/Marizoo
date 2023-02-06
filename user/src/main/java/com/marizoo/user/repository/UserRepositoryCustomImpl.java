package com.marizoo.user.repository;

import com.marizoo.user.dto.BadgeDto;
import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.QBadgeDto;
import com.marizoo.user.dto.QFavorStoreDto;
import com.marizoo.user.entity.Badge;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.marizoo.user.entity.QBadge.badge;
import static com.marizoo.user.entity.QUser.user;
import static com.marizoo.user.entity.QUsersAnimalStore.usersAnimalStore;
import static com.marizoo.user.entity.QUsersBadge.usersBadge;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public UserRepositoryCustomImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<FavorStoreDto> getFavorStoreList(Long userId) {
        return queryFactory
                .select(new QFavorStoreDto(
                        usersAnimalStore.animalStore.id,
                        usersAnimalStore.animalStore.storeName
                ))
                .from(usersAnimalStore)
                .where(usersAnimalStore.user.id.eq(userId))
                .fetch();
    }
}
