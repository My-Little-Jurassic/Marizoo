package com.marizoo.user.repository.animalstore_repo;


import com.marizoo.user.entity.UsersAnimalStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnimalStoreFollowRepository extends JpaRepository<UsersAnimalStore, Long> {

    UsersAnimalStore save(UsersAnimalStore usersAnimalStore);

}

