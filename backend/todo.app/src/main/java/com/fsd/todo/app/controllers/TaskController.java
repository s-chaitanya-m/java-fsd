package com.fsd.todo.app.controllers;

import com.fsd.todo.app.auth.CustomUserPrincipal;
import com.fsd.todo.app.dto.TaskRequest;
import com.fsd.todo.app.dto.TaskResponse;
import com.fsd.todo.app.entities.TaskStatus;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public List<TaskResponse> getMyTasks(
            @AuthenticationPrincipal CustomUserPrincipal principal
    ) {
        User user = principal.getUser();
        return taskService.getMyTasks(user);
    }


    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR', 'VIEWER')")
    public List<TaskResponse> getTasks(@PathVariable Long projectId) {
        return taskService.getByProject(projectId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public TaskResponse createTask(
            @RequestBody TaskRequest request,
            @AuthenticationPrincipal CustomUserPrincipal principal
    ) {
        User user = principal.getUser();
        return taskService.create(request, user);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR', 'VIEWER')")
    public TaskResponse updateStatus(
            @PathVariable Long id,
            @RequestParam TaskStatus status
    ) {
        return taskService.updateStatus(id, status);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public TaskResponse updateTask(
            @PathVariable Long id,
            @RequestBody TaskRequest request
    ) {
        return taskService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }
}