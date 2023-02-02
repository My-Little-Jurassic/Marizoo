package com.marizoo.user.repository;

import com.marizoo.user.entity.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
public class BroadcastRepositoryTest {

    @PersistenceContext
    EntityManager em;
    @Autowired
    BroadcastRepository broadcastRepository;

    @Test
    public void onAirs(){
        // given
        // 가게
        AnimalStore animalStore = new AnimalStore();
        animalStore.setStoreName("마리쥬 파충류 카페");
        animalStore.setProfileImg("marizooImage");

        // 방송 1
        Broadcast broadcast1 = new Broadcast();
        broadcast1.setTitle("우파루파 먹방");
        broadcast1.setThumbnail("우파루파먹방썸네일");

        List<BroadcastAnimal> broadcastAnimalList1 = new ArrayList<>();

        broadcast1.setBroadcastAnimalList(broadcastAnimalList1);
        broadcast1.setAnimalStore(animalStore);
        broadcast1.setStatus(BroadcastStatus.ONAIR);
        Vote vote1 = new Vote();
        vote1.setBroadcast(broadcast1);
        vote1.setTitle("투표1");
        broadcast1.setVote(vote1);

        broadcastRepository.save(broadcast1);

        // 방송 2
        Broadcast broadcast2 = new Broadcast();
        broadcast2.setTitle("우리 게코가 얼마나 귀엽게요");
        broadcast2.setThumbnail("게코썸네일");


        broadcast2.setAnimalStore(animalStore);
        broadcast2.setStatus(BroadcastStatus.FINISH);
        Vote vote2 = new Vote();
        vote2.setBroadcast(broadcast2);
        vote2.setTitle("투표2");
        broadcast2.setVote(vote2);

        broadcastRepository.save(broadcast2);

        // when
        List<Broadcast> onairs = broadcastRepository.findByStatus(BroadcastStatus.ONAIR);
        // then
        assertThat(onairs.size()).isEqualTo(2);
    }

}
