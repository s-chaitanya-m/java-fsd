package com.fsd.todo.app.auth;

import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal OAuth2User oauthUser) {
        if (oauthUser == null) return null;
        String email = oauthUser.getAttribute("email");
        User user = userRepository.findByEmail(email).orElseThrow();

        return Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "role", user.getRole()
        );
    }

    @GetMapping("debug")
    public Object debug(Authentication auth) {
        return auth.getAuthorities();
    }
}
