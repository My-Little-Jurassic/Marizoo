package com.marizoo.user.exception;

public class BadgeNotFoundException extends RuntimeException {
    public BadgeNotFoundException() {
        super();
    }

    public BadgeNotFoundException(String message) {
        super(message);
    }

    public BadgeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BadgeNotFoundException(Throwable cause) {
        super(cause);
    }
}
