package com.tasks.services.Task;

import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.models.Task;

import java.util.List;

public interface TaskService {

     Task createTask(TaskRequestDto task, Long userId);

     Task updateTask(Long TaskID, TaskRequestDto task);

     void deleteTask(Long TaskID);

     Task getTaskById(Long id);

     List<TaskResponseDto> getAllTasks(Long userId);
}
