package com.marizoo.user.constant;

import java.util.Map;

public final class BadgeCondition {

    public static final Map<Long, Long> watch = Map.of(
            1L, 1L,
            5L, 2L,
            10L, 3L,
            20L, 4L,
            30L, 5L,
            50L, 6L,
            70L, 7L,
            100L, 8L,
            200L, 9L
    );

    public static final Map<Long, Long> effect = Map.of(
            10L, 19L,
            50L, 20L,
            100L, 21L,
            200L, 22L,
            500L, 23L,
            1000L, 24L,
            2000L, 25L,
            5000L, 26L,
            10000L, 27L
    );

    public static final Map<Long, Long> feed = Map.of(
            1L, 28L,
            5L, 29L,
            10L, 30L,
            15L, 31L,
            20L, 32L,
            30L, 33L,
            50L, 34L,
            70L, 35L,
            100L, 36L
    );
}
