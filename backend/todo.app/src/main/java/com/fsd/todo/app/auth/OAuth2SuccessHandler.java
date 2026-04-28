package com.fsd.todo.app.auth;

import com.fsd.todo.app.entities.Role;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        String email = token.getPrincipal().getAttribute("email");
        String name = token.getPrincipal().getAttribute("name");
        User dbUser = userRepository.findByEmail(email)
                .orElseGet(()->userRepository.save(
                        User.builder()
                                .email(email)
                                .name(name)
                                .role(Role.VIEWER)
                                .build()
                ));
        try {
            response.sendRedirect("http://localhost:5173");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
