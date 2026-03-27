package com.tasktracker.task;

import com.tasktracker.project.Project;
import com.tasktracker.project.ProjectRepository;
import com.tasktracker.task.dto.*;
import com.tasktracker.user.User;
import com.tasktracker.user.UserRepository;
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