package com.fsd.todo.app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProjectRequest {
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}