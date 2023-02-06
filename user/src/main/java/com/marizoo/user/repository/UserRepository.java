package com.marizoo.user.repository;

import com.marizoo.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findByUid(String username);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long userId);
}
