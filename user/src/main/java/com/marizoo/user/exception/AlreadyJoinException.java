package com.marizoo.user.exception;

public class AlreadyJoinException extends RuntimeException {
    public AlreadyJoinException() {
        super();
    }

    public AlreadyJoinException(String message) {
        super(message);
    }

    public AlreadyJoinException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyJoinException(Throwable cause) {
        super(cause);
    }
}
