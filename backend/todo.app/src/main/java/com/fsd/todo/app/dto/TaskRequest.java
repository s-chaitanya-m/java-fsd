package com.fsd.todo.app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {
    private String description;
    private LocalDate dueDate;
    private Long projectId;
    private Long ownerId; // for assignment
}