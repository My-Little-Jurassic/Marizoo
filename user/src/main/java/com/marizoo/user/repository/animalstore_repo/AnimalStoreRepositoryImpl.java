package com.marizoo.user.repository.animalstore_repo;

import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
import com.marizoo.user.dto.animal_dto.QOwnedAnimalDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.QAnimalStore;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.marizoo.user.entity.QAnimal.animal;
import static com.marizoo.user.entity.QAnimalStore.animalStore;
import static com.marizoo.user.entity.QSpecies.species;

public class AnimalStoreRepositoryImpl implements AnimalStoreRepositoryCustom{

    private JPAQueryFactory queryFactory;
    public AnimalStoreRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    // 종으로 해당하는 가게 검색
    @Override
    public List<AnimalStore> searchAnimalStoreHavingSpecies(String input) {

        List<AnimalStore> findAnimalStore = queryFactory
                .select(animal.animalStore)
                .from(animal)
                .join(animal.species, species)
                .where(species.classification.like(input))
                .fetch();

        return findAnimalStore;
    }

    // 해당 가게가 데리고 있는 동물의 정보(종 정보)를 조회.
    public List<OwnedAnimalDto> findOwnedAnimalInfo(Long storeId){

        List<OwnedAnimalDto> findOwnedAnimal = queryFactory
                .select(new QOwnedAnimalDto(animal.name, species.classification, animal.img))
                .from(animal)
                .join(animal.species, species)
                .where(animal.animalStore.eq(
                        JPAExpressions
                                .select(animalStore)
                                .join(animal.animalStore, animalStore)
                                .where(animalStore.id.eq(storeId))
                        )
                ).fetch();

        return findOwnedAnimal;
    }



}
















