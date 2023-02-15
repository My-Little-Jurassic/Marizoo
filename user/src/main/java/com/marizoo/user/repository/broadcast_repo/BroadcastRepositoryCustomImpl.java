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

    /**
     *
     * @param input : 검색어
     * @return 현재 진행 중인 방송 중 input에 해당하는 종이 출연하는 방송 list
     */
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

    /**
     *
     * @param bstatus : 방송 상태. 현재는 onair를 파라미터로 준다.
     * @return bstatus인지 아닌지
     */
    private BooleanExpression onAir(BroadcastStatus bstatus){
        return bstatus != null ? broadcast.status.eq(bstatus) : null;
    }

    /**
     *
     * @param input : 검색어
     * @return input이 null이 아니라면 broadcastAnimal의 classification과 like연산 결과를 반환
     */
    private BooleanExpression classificationLike(String input){
        return input != null ? broadcastAnimal.classification.like(input) : null;
    }

    /**
     *
     * @param classifications : 종 list
     */
    private BooleanExpression classificationsIn(List<String> classifications){
        return classifications != null ? broadcastAnimal.classification.in(classifications) : null;
    }

    /**
     *
     * @param broadcastId : 방송 pk
     * @param classifications : 해당 방송에 출연하는 종 list
     * @return 해당 방송에 출연하는 종이 출연하는 방송 list
     */
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

    /**
     *
     * @param broadcastId : 방송 pk
     * @return 자신이 아닌지 확인
     */
    private BooleanExpression notMine(Long broadcastId){
        return broadcastId != null ? broadcast.id.ne(broadcastId): null;
    }
}
