package com.fsd.todo.app.service;

import com.fsd.todo.app.dto.TaskRequest;
import com.fsd.todo.app.dto.TaskResponse;
import com.fsd.todo.app.entities.Project;
import com.fsd.todo.app.entities.Task;
import com.fsd.todo.app.entities.TaskStatus;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.ProjectRepository;
import com.fsd.todo.app.repositories.TaskRepository;
import com.fsd.todo.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<TaskResponse> getByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse create(TaskRequest req, User creator) {

        Project project = projectRepository.findById(req.getProjectId())
                .orElseThrow();

        User owner = userRepository.findById(req.getOwnerId())
                .orElse(creator); // fallback

        Task task = Task.builder()
                .description(req.getDescription())
                .dueDate(req.getDueDate())
                .status(TaskStatus.NEW)
                .project(project)
                .owner(owner)
                .build();

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateStatus(Long id, TaskStatus status) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setStatus(status);
        return toResponse(taskRepository.save(task));
    }

    public TaskResponse update(Long id, TaskRequest req) {
        Task task = taskRepository.findById(id).orElseThrow();

        task.setDescription(req.getDescription());
        task.setDueDate(req.getDueDate());

        if (req.getOwnerId() != null) {
            User owner = userRepository.findById(req.getOwnerId()).orElseThrow();
            task.setOwner(owner);
        }

        return toResponse(taskRepository.save(task));
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    private TaskResponse toResponse(Task t) {
        return TaskResponse.builder()
                .id(t.getId())
                .description(t.getDescription())
                .dueDate(t.getDueDate())
                .status(t.getStatus())
                .owner(t.getOwner().getEmail())
                .project(t.getProject().getName())
                .build();
    }
}