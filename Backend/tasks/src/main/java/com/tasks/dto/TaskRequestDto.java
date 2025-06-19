package com.tasks.dto;


import com.tasks.enums.Status;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {

    private Long userId;


    private String title;

    private String description;

    private Status status;
}
