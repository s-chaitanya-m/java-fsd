package com.fsd.todo.app.dto;

import com.fsd.todo.app.entities.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TaskResponse {
    private Long id;
    private String description;
    private LocalDate dueDate;
    private TaskStatus status;
    private String owner;
    private String project;
}