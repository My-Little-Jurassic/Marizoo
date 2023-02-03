package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import com.marizoo.user.entity.QBroadcast;
import com.marizoo.user.entity.QBroadcastAnimal;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;

import static com.marizoo.user.entity.QAnimal.animal;
import static com.marizoo.user.entity.QBroadcast.broadcast;
import static com.marizoo.user.entity.QBroadcastAnimal.broadcastAnimal;

public class AnimalRepositoryImpl implements AnimalRepositoryCustom{

    private JPAQueryFactory queryFactory;
    public AnimalRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public BroadcastStatus findBroadcastStatus(Long animalId){

        BroadcastStatus status = queryFactory
                .select(broadcast.status)
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(broadcastAnimal.animal.id.eq(animalId))
                .fetchOne();

        return status;
    }

}
