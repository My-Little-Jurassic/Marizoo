package com.marizoo.user.repository;

import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.QFavorStoreDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static com.marizoo.user.entity.QUsersAnimalStore.usersAnimalStore;

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
