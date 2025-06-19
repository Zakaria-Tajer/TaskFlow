package com.tasks.exceptions;


import com.tasks.dto.AppErrorResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class MainExceptionHandler {


    private final MessageSource messageSource;



    @ExceptionHandler(FunctionalException.class)
    public ResponseEntity<AppErrorResponseDto> handleNoDataResponse(FunctionalException ex, WebRequest request, Locale locale) {
        String message = messageSource.getMessage(ex.getMessageCode(), null, locale);
        AppErrorResponseDto errorResponse = new AppErrorResponseDto();
        errorResponse.setMessage(message);
        errorResponse.setPath(request.getDescription(false));
        errorResponse.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorResponse, ex.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<AppErrorResponseDto> handleValidationExceptions(
            MethodArgumentNotValidException ex, WebRequest request) {
        AppErrorResponseDto errorResponse = new AppErrorResponseDto();
        errorResponse.setErrors(ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList()));
        errorResponse.setPath(request.getDescription(false));
        errorResponse.setTimestamp(LocalDateTime.now());
        errorResponse.setMessage(messageSource.getMessage("ERR_BODY_EMPTY", null, Locale.getDefault()));


        return ResponseEntity.badRequest().body(errorResponse);
    }
}
