package com.fsd.todo.app.controllers;

import com.fsd.todo.app.auth.CustomUserPrincipal;
import com.fsd.todo.app.dto.ProjectRequest;
import com.fsd.todo.app.dto.ProjectResponse;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR', 'VIEWER')")
    public List<ProjectResponse> getProjects() {
        return projectService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR', 'VIEWER')")
    public ProjectResponse getProjects(@PathVariable Long id) {
        return projectService.getProjectbyId(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public ProjectResponse createProject(
            @RequestBody ProjectRequest request,
            @AuthenticationPrincipal CustomUserPrincipal principal
    ) {
        User user = principal.getUser();
        return projectService.create(request, user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @RequestBody ProjectRequest request
    ) {
        return projectService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProject(@PathVariable Long id) {
        projectService.delete(id);
    }
}