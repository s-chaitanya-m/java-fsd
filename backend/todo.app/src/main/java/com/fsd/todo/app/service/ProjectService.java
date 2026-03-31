package com.fsd.todo.app.service;

import com.fsd.todo.app.dto.ProjectRequest;
import com.fsd.todo.app.dto.ProjectResponse;
import com.fsd.todo.app.entities.Project;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectResponse> getAll() {
        return projectRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectResponse create(ProjectRequest request, User user) {
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .owner(user)
                .build();

        return toResponse(projectRepository.save(project));
    }

    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow();

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        return toResponse(projectRepository.save(project));
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    private ProjectResponse toResponse(Project p) {
        return ProjectResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .startDate(p.getStartDate())
                .endDate(p.getEndDate())
                .owner(p.getOwner().getEmail())
                .build();
    }
}