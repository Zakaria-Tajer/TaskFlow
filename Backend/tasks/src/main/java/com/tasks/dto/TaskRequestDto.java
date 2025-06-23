package com.tasks.dto;


import com.tasks.enums.Priority;
import com.tasks.enums.Status;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {

    private Long userId;


    @NotBlank(message = "Title is required")
    @Size(max = 150, min = 3, message = "Title must be between 3 and 100 characters")
    private String title;

    @Size(max = 1000, min = 6, message = "Description must be between 6 and 1000 characters")
    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Priority is required")
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @NotNull(message = "Due Date is required")
    private LocalDate dueDate;
}
