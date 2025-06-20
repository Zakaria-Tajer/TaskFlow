package com.tasks.dto;


import com.tasks.enums.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {

    private Long userId;

    @NotBlank(message = "Title is required")
    @Size(max = 150, min = 3, message = "Title must be between 3 and 100 characters")
    private String title;

    @Size(max = 1000, min = 6, message = "must be between 6 and 1000 characters")
    private String description;

    private Status status;
}
