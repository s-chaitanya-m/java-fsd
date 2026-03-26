package com.tasktracker.project;

import com.tasktracker.project.dto.*;
import com.tasktracker.user.User;
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