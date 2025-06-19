package com.tasks.exceptions;

import org.springframework.http.HttpStatus;

import java.io.Serial;

public class FunctionalException extends RuntimeException{


    @Serial
    private static final long serialVersionUID = 1L;

    private final String messageCode;
    private final HttpStatus httpStatus;

    public FunctionalException(String messageCode, HttpStatus httpStatus) {
        super(messageCode);
        this.messageCode = messageCode;
        this.httpStatus = httpStatus;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
