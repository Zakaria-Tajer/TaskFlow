package com.tasks.services;

import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.mappers.TaskMapper;
import com.tasks.models.Task;
import com.tasks.repository.TasksRepository;
import com.tasks.services.Task.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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
        Optional<Task> existingTask = tasksRepository.findById(TaskID);

//        Need to implement the logic for empty task
        if (existingTask.isEmpty()) {}

        Task existingTaskEntity = existingTask.get();

        existingTaskEntity.setTitle(task.getTitle() != null ? task.getTitle() : existingTaskEntity.getTitle());
        existingTaskEntity.setStatus(task.getStatus() != null ? task.getStatus() : existingTaskEntity.getStatus());
        existingTaskEntity.setDescription(task.getDescription() != null ? task.getDescription() : existingTaskEntity.getDescription());

        log.info("Updating task {}", task.getStatus());
        return tasksRepository.save(existingTaskEntity);
    }

    @Override
    public void deleteTask(Long TaskID) {
        Optional<Task> existingTask = tasksRepository.findById(TaskID);

        //   Also with this / Need to implement the logic for empty task

        if (existingTask.isEmpty()) {}

        Task taskExists = existingTask.get();


        log.info("Deleting task {}", taskExists.getTitle());
        tasksRepository.delete(taskExists);
    }

    @Override
    public Task getTaskById(Long id) {
        return null;
    }


    @Override
    public List<TaskResponseDto> getAllTasks() {
        return tasksRepository.findAll()
                .stream()
                .map(TaskMapper::toResponseDTO)
                .collect(Collectors.toList());
    }





}
