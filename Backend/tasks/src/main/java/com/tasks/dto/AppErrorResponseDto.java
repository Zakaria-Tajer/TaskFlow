package com.tasks.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppErrorResponseDto {

    private String message;
    private String path;
    private LocalDateTime timestamp;
    private List<String> errors;
}
