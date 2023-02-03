package com.marizoo.user.repository.reservation_repo;

import com.marizoo.user.entity.UsersPlay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersPlayRepository extends JpaRepository<UsersPlay, Long> {

    UsersPlay findUsersPlayById(Long bookId);

}
