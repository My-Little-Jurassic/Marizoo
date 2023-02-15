package com.marizoo.user.repository;

import com.marizoo.user.entity.*;
import com.marizoo.user.repository.broadcast_repo.BroadcastRepository;
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

    }

}
