package com.marizoo.user.repository;

import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Rollback
class AnimalStoreRepositoryTest {

    @Autowired
    AnimalStoreRepository animalStoreRepository;

    @Test
    public void testStore(){

    }

}