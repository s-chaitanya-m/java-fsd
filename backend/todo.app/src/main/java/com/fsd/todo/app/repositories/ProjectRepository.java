package com.fsd.todo.app.repositories;

import com.fsd.todo.app.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}