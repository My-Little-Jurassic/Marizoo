package com.marizoo.user.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UsersBadgeRepository {

    private final JdbcTemplate jdbcTemplate;

    private int batchSize = 10000;

    public int bulkAddBadge(List<Long> userIdList, Long badgeId) {
        int batchCount = 0;
        List<Long> subItems = new ArrayList<>();
        for (int i = 0; i < userIdList.size(); i++) {
            subItems.add(userIdList.get(i));
            if ((i + 1) % batchSize == 0) {
                batchCount = batchInsert(batchCount, subItems, badgeId);
            }
        }
        if (!subItems.isEmpty()) {
            batchCount = batchInsert(batchCount, subItems, badgeId);
        }

        return batchCount;
    }

    private int batchInsert(int batchCount, List<Long> subItems, Long badgeId) {
        jdbcTemplate.batchUpdate("insert into users_badge (`user_id`, `badge_id`) values (?, ?)", new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setLong(1, subItems.get(i));
                ps.setLong(2, badgeId);
            }

            @Override
            public int getBatchSize() {
                return subItems.size();
            }
        });
        subItems.clear();
        batchCount++;
        return batchCount;
    }
}
