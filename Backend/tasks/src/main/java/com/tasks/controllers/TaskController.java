package com.tasks.controllers;


import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.mappers.TaskMapper;
import com.tasks.services.Task.TaskService;
import com.tasks.services.User.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/tasks/")
@RequiredArgsConstructor
public class TaskController {


    public final TaskService taskService;
    public final UserService userService;

    @PostMapping("create")
    public ResponseEntity<TaskResponseDto> addTask(@Valid @AuthenticationPrincipal UserDetails userDetails, @RequestBody TaskRequestDto taskRequestDto) {
        Long userId = userService.getUserByEmail(userDetails.getUsername()).getId();

        return ResponseEntity.ok(TaskMapper.toResponseDTO(taskService.createTask(taskRequestDto, userId)));
    }


    @PutMapping("update/{taskID}")
    public ResponseEntity<TaskResponseDto> updateTask(@Valid @PathVariable Long taskID, @RequestBody TaskRequestDto taskRequestDto) {
        return ResponseEntity.ok(TaskMapper.toResponseDTO(taskService.updateTask(taskID, taskRequestDto)));
    }

    @DeleteMapping("delete/{taskID}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long taskID) {
        taskService.deleteTask(taskID);
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }


    @GetMapping("all")
    public List<TaskResponseDto> getAllTasks(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = userService.getUserByEmail(userDetails.getUsername()).getId();

        return taskService.getAllTasks(userId);
    }


}
