package com.marizoo.user.repository.broadcast_repo;

import com.marizoo.user.dto.broadcast_dto.QRelatedBroadcastDto;
import com.marizoo.user.dto.broadcast_dto.RelatedBroadcastDto;

import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;
import static com.marizoo.user.entity.QBroadcast.broadcast;
import static com.marizoo.user.entity.QBroadcastAnimal.broadcastAnimal;

public class BroadcastRepositoryCustomImpl implements BroadcastRepositoryCustom {

    private JPAQueryFactory queryFactory;
    public BroadcastRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Broadcast> searchOnAirsHavingSpecies(String input) {
        BroadcastStatus status = BroadcastStatus.ONAIR;
        return queryFactory
                .select(broadcast).distinct()
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(onAir(status).and(classificationLike(input)))
                .fetch();
    }

    private BooleanExpression onAir(BroadcastStatus bstatus){
        return bstatus != null ? broadcast.status.eq(bstatus) : null;
    }

    private BooleanExpression classificationLike(String input){
        return input != null ? broadcastAnimal.classification.like(input) : null;
    }

    private BooleanExpression classificationsIn(List<String> classifications){
        return classifications != null ? broadcastAnimal.classification.in(classifications) : null;
    }

    @Override
    public List<RelatedBroadcastDto> searchBroadcastRelated(Long broadcastId, List<String> classifications) {
        BroadcastStatus status = BroadcastStatus.ONAIR;
        return queryFactory
                .select(new QRelatedBroadcastDto(broadcast.id, broadcast.sessionId, broadcast.title, broadcast.thumbnail)).distinct()
                .from(broadcastAnimal)
                .join(broadcastAnimal.broadcast, broadcast)
                .where(onAir(status), classificationsIn(classifications), notMine(broadcastId))
                .fetch();

    }
    private BooleanExpression notMine(Long broadcastId){
        return broadcastId != null ? broadcast.id.ne(broadcastId): null;
    }
}
