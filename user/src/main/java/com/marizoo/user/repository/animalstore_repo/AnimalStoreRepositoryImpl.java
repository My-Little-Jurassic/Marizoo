package com.marizoo.user.repository.animalstore_repo;

import com.marizoo.user.dto.UsersPlay_dto.QUsersPlayDto;
import com.marizoo.user.dto.UsersPlay_dto.UsersPlayDto;
import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
import com.marizoo.user.dto.animal_dto.QOwnedAnimalDto;
import com.marizoo.user.entity.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import java.util.List;

import static com.marizoo.user.entity.QAnimal.animal;
import static com.marizoo.user.entity.QAnimalFeed.animalFeed;
import static com.marizoo.user.entity.QAnimalStore.animalStore;
import static com.marizoo.user.entity.QBroadcast.broadcast;
import static com.marizoo.user.entity.QBroadcastAnimal.broadcastAnimal;
import static com.marizoo.user.entity.QFeed.feed;
import static com.marizoo.user.entity.QPlay.play;
import static com.marizoo.user.entity.QSpecies.species;
import static com.marizoo.user.entity.QUsersPlay.usersPlay;

public class AnimalStoreRepositoryImpl implements AnimalStoreRepositoryCustom{

    private JPAQueryFactory queryFactory;
    public AnimalStoreRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    // 종으로 해당하는 가게 검색
    public List<AnimalStore> searchAnimalStoreHavingSpecies(String input) {

        List<AnimalStore> findAnimalStore = queryFactory
                .select(animal.animalStore).distinct()
                .from(animal)
                .join(animal.species, species)
                .where(species.classification.like(input))
                .fetch();

        return findAnimalStore;
    }

    // 해당 가게가 데리고 있는 동물의 정보(종 정보)를 조회.
    public List<OwnedAnimalDto> findOwnedAnimalInfo(Long storeId){

        List<OwnedAnimalDto> findOwnedAnimal = queryFactory
                .select(new QOwnedAnimalDto(animal.name, species.classification, animal.img, animal.gender))
                .from(animal)
                .join(animal.species, species)
                .where(animal.animalStore.id.eq(storeId))
                .fetch();

        return findOwnedAnimal;
    }

    // 스트리밍 중인 방송에 출연하는 동물의 종정보
    public List<String> findClassificationImgs(Long storeId){

        List<String> classificationImgs = queryFactory
                .select(broadcastAnimal.classificationImg)
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(broadcast.animalStore.id.eq(storeId))
                .fetch();
        return classificationImgs;
    }

    // 동물id에 해당하는 먹이 목록 조회.
    public List<Feed> findFeedList(Long animalId){

        List<Feed> feedList = queryFactory
                .select(feed)
                .from(feed)
                .join(feed, animalFeed.feed)
                .where(animalFeed.id.eq(animalId))
                .fetch();
        return feedList;
    }

    public UsersPlayDto findStoreNameForReservation(Long bookId){
        UsersPlayDto ReservationInfo = queryFactory
                .select(new QUsersPlayDto(animalStore.storeName, play.playDateTime))
                .from(play)
                .join(play.animalStore, animalStore)
                .where(play.eq(
                        JPAExpressions
                                .select(usersPlay.play)
                                .from(usersPlay)
                                .join(usersPlay.play, play)
                                .where(usersPlay.id.eq(bookId))))
                .fetchOne();
        return ReservationInfo;
    }

}
















