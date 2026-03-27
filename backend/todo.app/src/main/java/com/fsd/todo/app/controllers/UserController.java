package com.fsd.todo.app.controllers;

import com.fsd.todo.app.dto.UserResponse;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}