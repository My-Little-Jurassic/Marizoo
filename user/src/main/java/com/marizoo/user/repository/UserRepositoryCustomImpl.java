package com.marizoo.user.repository;

import com.marizoo.user.dto.FavorStoreDto;
import com.marizoo.user.dto.QFavorStoreDto;
import com.marizoo.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.marizoo.user.entity.QBadge.badge;
import static com.marizoo.user.entity.QUser.user;
import static com.marizoo.user.entity.QUsersAnimalStore.usersAnimalStore;
import static com.marizoo.user.entity.QUsersBadge.usersBadge;
import static com.marizoo.user.entity.QUsersPlay.usersPlay;
import static com.marizoo.user.entity.QPlay.play;

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
                        usersAnimalStore.animalStore.storeName,
                        usersAnimalStore.animalStore.tel,
                        usersAnimalStore.animalStore.address,
                        usersAnimalStore.animalStore.profileImg
                ))
                .from(usersAnimalStore)
                .where(usersAnimalStore.user.id.eq(userId))
                .fetch();
    }

    @Override
    public User getBadgeList(Long userId) {
        return queryFactory
                .select(user).distinct()
                .from(user)
                .join(user.badgeList, usersBadge).fetchJoin()
                .join(usersBadge.badge, badge).fetchJoin()
                .where(user.id.eq(userId))
                .fetchOne();
    }

    @Override
    public User getBookList(Long userId) {
        return queryFactory
                .select(user).distinct()
                .from(user)
                .join(user.bookList, usersPlay).fetchJoin()
                .join(usersPlay.play, play).fetchJoin()
                .where(user.id.eq(userId))
                .fetchOne();
    }
}
