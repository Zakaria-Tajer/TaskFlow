package com.tasks.controllers;


import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.mappers.TaskMapper;
import com.tasks.services.Task.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/tasks/")
@RequiredArgsConstructor
public class TaskController {


    public final TaskService taskService;

    @PostMapping("create")
    public ResponseEntity<TaskResponseDto> addTask(@RequestBody TaskRequestDto taskRequestDto) {
        return ResponseEntity.ok(TaskMapper.toResponseDTO(taskService.createTask(taskRequestDto)));
    }


}
