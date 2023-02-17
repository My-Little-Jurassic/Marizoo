package com.marizoo.user.constant;

public final class JwtConstant {

    public static final long MINUTE = 1000 * 60;
    public static final long HOUR = 60 * MINUTE;
    public static final long DAY = 24 * HOUR;
    public static final long MONTH = 30 * DAY;

    public static final long AT_EXP_TIME = 10 * MINUTE;
    public static final long RT_EXP_TIME = 30 * MINUTE;

    public static final String JWT_SECRET = "marizoo";

    public static final String AT_HEADER = "access-token";
    public static final String RT_HEADER = "refresh-token";
    public static final String TOKEN_HEADER_PREFIX = "Bearer ";
}
