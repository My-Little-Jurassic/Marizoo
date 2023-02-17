package com.marizoo.user.exception;

public class PlayReservationCloasedException extends RuntimeException{
    public PlayReservationCloasedException() {
        super();
    }

    public PlayReservationCloasedException(String message) {
        super(message);
    }

    public PlayReservationCloasedException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlayReservationCloasedException(Throwable cause) {
        super(cause);
    }

    protected PlayReservationCloasedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
