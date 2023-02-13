package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.dto.animal_dto.AnimalDetailDto;
import com.marizoo.user.dto.animal_dto.QAnimalDetailDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastStatusDto;
import com.marizoo.user.dto.broadcast_dto.QBroadcastStatusDto;
import com.marizoo.user.entity.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;

import static com.marizoo.user.entity.QAnimal.animal;
import static com.marizoo.user.entity.QAnimalStore.animalStore;
import static com.marizoo.user.entity.QBroadcast.broadcast;
import static com.marizoo.user.entity.QBroadcastAnimal.broadcastAnimal;
import static com.marizoo.user.entity.QSpecies.species;

public class AnimalRepositoryImpl implements AnimalRepositoryCustom{

    private JPAQueryFactory queryFactory;
    public AnimalRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public BroadcastStatusDto findBroadcastStatus(Long animalId){
        BroadcastStatus bstatus = BroadcastStatus.ONAIR;
        BroadcastStatusDto status = queryFactory
                .select(new QBroadcastStatusDto(broadcast.id, broadcast.status))
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(broadcastAnimal.animal.id.eq(animalId), broadcast.status.eq(bstatus))
                .fetchOne();

        return status;
    }
    private BooleanExpression onAir(BroadcastStatus bstatus){
        return bstatus != null ? broadcast.status.eq(bstatus) : null;
    }

    @Override
    public AnimalDetailDto findAnimalDetail(Long animalId) {
        AnimalDetailDto animalDetailDto = queryFactory
                .select(new QAnimalDetailDto(animal, animal.animalStore, animal.species))
                .from(animal)
                .join(animal.species, species)
                .join(animal.animalStore, animalStore)
                .where(animal.id.eq(animalId))
                .fetchOne();

        return animalDetailDto;
    }

}
