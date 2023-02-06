package com.marizoo.user;

import com.marizoo.user.entity.Badge;
import com.marizoo.user.entity.BadgeType;
import com.marizoo.user.entity.User;
import com.marizoo.user.entity.UsersBadge;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

//@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit1() {
            User user1 = createUser();

            Badge badge = createBadge();
            em.persist(badge);

            Badge badge2 = createBadge();
            em.persist(badge2);

            UsersBadge usersBadge = UsersBadge.createUsersBadge(badge);
            UsersBadge usersBadge2 = UsersBadge.createUsersBadge(badge2);
            user1.addBadge(usersBadge);
            user1.addBadge(usersBadge2);

            em.persist(user1);

            User user2 = createUser();
            em.persist(user2);

            User user3 = createUser();
            em.persist(user3);
        }

        private User createUser() {
            User user = new User();
            user.setUid("seungbok");
            user.setEmail("test@gmail.com");
            return user;
        }

        private Badge createBadge() {
            Badge badge = new Badge();
            badge.setBadgeType(BadgeType.WATCH);
            badge.setDescription("Test Badge");
            return badge;
        }
    }
}
