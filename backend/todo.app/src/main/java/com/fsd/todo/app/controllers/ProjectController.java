package com.fsd.todo.app.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public String createProject() {
        return "Project Created";
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    @GetMapping
    public String getProjects() {
        return "List of Projects";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProject() {
        return "Deleted";
    }
}
