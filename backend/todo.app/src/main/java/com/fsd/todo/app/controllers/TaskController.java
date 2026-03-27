package com.tasktracker.task;

import com.tasktracker.auth.CustomUserPrincipal;
import com.tasktracker.task.dto.*;
import com.tasktracker.user.User;
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
}