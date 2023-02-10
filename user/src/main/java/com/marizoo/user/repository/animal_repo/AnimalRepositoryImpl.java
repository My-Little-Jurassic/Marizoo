package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.dto.broadcast_dto.BroadcastStatusDto;
import com.marizoo.user.dto.broadcast_dto.QBroadcastStatusDto;
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

    public BroadcastStatusDto findBroadcastStatus(Long animalId){

        BroadcastStatusDto status = queryFactory
                .select(new QBroadcastStatusDto(broadcast.id, broadcast.status))
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(broadcastAnimal.animal.id.eq(animalId))
                .fetchOne();

        return status;
    }

}
