package com.fsd.todo.app.controllers;

import com.fsd.todo.app.dto.UserResponse;
import com.fsd.todo.app.entities.Role;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.UserRepository;
import com.fsd.todo.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CREATOR')")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateRole(
            @PathVariable Long id,
            @RequestParam Role role
    ) {
        return userService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}