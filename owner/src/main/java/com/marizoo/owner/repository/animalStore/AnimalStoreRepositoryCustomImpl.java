package com.marizoo.owner.repository.animalStore;

import com.marizoo.owner.dto.OwnedAnimalDto;
import com.marizoo.owner.dto.QOwnedAnimalDto;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.marizoo.owner.entity.QAnimal.animal;
import static com.marizoo.owner.entity.QSpecies.species;


public class AnimalStoreRepositoryCustomImpl implements AnimalStoreRepositoryCustom{
    private JPAQueryFactory queryFactory;
    public AnimalStoreRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }
    // 해당 가게가 데리고 있는 동물의 정보(종 정보)를 조회.
    public List<OwnedAnimalDto> findOwnedAnimalInfo(Long storeId){

        List<OwnedAnimalDto> findOwnedAnimal = queryFactory
                .select(new QOwnedAnimalDto(animal.id, animal.name, species.classification))
                .from(animal)
                .join(animal.species, species).fetchJoin()
                .where(animal.animalStore.id.eq(storeId))
                .fetch();
        return findOwnedAnimal;
    }

}
