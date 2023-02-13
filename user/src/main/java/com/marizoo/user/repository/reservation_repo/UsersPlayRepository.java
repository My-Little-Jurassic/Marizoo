package com.marizoo.user.repository.reservation_repo;

import com.marizoo.user.entity.UsersPlay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsersPlayRepository extends JpaRepository<UsersPlay, Long> {

    UsersPlay findUsersPlayById(Long bookId);

    // playId 체험 프로그램을 예약한 사람 수
    @Query(value = " select sum(usersPlay.total_visitor)  from users_play usersPlay where usersPlay.play_id = :playId", nativeQuery = true)
    Optional<Integer> findPlayTotalVisitor(@Param("playId") Long playId);

}
