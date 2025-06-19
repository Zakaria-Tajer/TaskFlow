package com.tasks.controllers;


import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.mappers.TaskMapper;
import com.tasks.services.Task.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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


    @PutMapping("update/{taskID}")
    public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long taskID, @RequestBody TaskRequestDto taskRequestDto) {
        return ResponseEntity.ok(TaskMapper.toResponseDTO(taskService.updateTask(taskID, taskRequestDto)));
    }

    @DeleteMapping("delete/{taskID}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long taskID) {
        taskService.deleteTask(taskID);
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }


    @GetMapping("all")
    public List<TaskResponseDto> addTask() {
        return taskService.getAllTasks();
    }


}
