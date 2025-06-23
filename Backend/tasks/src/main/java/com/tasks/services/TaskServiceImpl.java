package com.tasks.services;

import com.tasks.dto.TaskRequestDto;
import com.tasks.dto.TaskResponseDto;
import com.tasks.exceptions.FunctionalException;
import com.tasks.mappers.TaskMapper;
import com.tasks.models.Task;
import com.tasks.models.User;
import com.tasks.repository.TasksRepository;
import com.tasks.repository.UserRepository;
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
    public final UserRepository userRepository;



    @Override
    public Task createTask(TaskRequestDto task, Long userId) {



        log.info("Creating task {}", task.getStatus());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new FunctionalException("USER_NOT_FOUND", HttpStatus.NOT_FOUND));

        Task newTask = TaskMapper.toEntity(task);
        newTask.setUser(user);

        return tasksRepository.save(newTask);
    }

    @Override
    public Task updateTask(Long TaskID, TaskRequestDto task) {
        Task existingTask = getTaskById(TaskID);


        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());



        log.info("Updating task {}", existingTask);
        return tasksRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long TaskID) {
        Task taskExists = getTaskById(TaskID);

        log.info("Deleting task {}", taskExists.getTitle());
        tasksRepository.delete(taskExists);
    }


    @Override
    public List<TaskResponseDto> getAllTasks(Long userId) {
        return tasksRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(TaskMapper::toResponseDTO)
                .collect(Collectors.toList());

    }

    @Override
    public Task getTaskById(Long TaskID) {
        return tasksRepository.findById(TaskID)
                .orElseThrow(() -> new FunctionalException("TASK_NOT_FOUND", HttpStatus.NOT_FOUND));
    }






}
