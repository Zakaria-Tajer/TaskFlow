package com.tasks.mappers;

import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.enums.Status;
import com.tasks.models.Task;

public class TaskMapper {

    public static Task toEntity(TaskRequestDto dto) {
        if (dto == null) return null;

        return Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .priority(dto.getPriority())
                .dueDate(dto.getDueDate())
                .status(dto.getStatus() == null ? Status.PENDING: dto.getStatus())
                .build();
    }

    public static TaskResponseDto toResponseDTO(Task task) {
        if (task == null) return null;

        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
