package com.tasktracker.project;

import com.tasktracker.auth.CustomUserPrincipal;
import com.tasktracker.project.dto.*;
import com.tasktracker.user.User;
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

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public ProjectResponse createProject(
            @RequestBody ProjectRequest request,
            @AuthenticationPrincipal CustomUserPrincipal principal
    ) {
        User user = principal.getUser();
        return projectService.create(request, user);
    }
}