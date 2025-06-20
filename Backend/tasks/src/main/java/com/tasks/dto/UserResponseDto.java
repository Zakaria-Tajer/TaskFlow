package com.tasks.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Date timestamp;
    private HttpStatus statusCode;
    private String message;
    private String token;
}
