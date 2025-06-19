package com.tasks.services;

import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.mappers.TaskMapper;
import com.tasks.models.Task;
import com.tasks.repository.TasksRepository;
import com.tasks.services.Task.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {


    public final TasksRepository tasksRepository;

    @Override
    public Task createTask(TaskRequestDto task) {

        log.info("Creating task {}", task.getStatus());

        Task newTask = TaskMapper.toEntity(task);


        return tasksRepository.save(newTask);
    }

    @Override
    public Task updateTask(Long TaskID, TaskRequestDto task) {
        return null;
    }

    @Override
    public void deleteTask(Long TaskID) {
    }


    @Override
    public List<TaskResponseDto> getAllTasks() {
        return null;
    }

    @Override
    public Task getTaskById(Long TaskID) {
        return null;
    }



}
