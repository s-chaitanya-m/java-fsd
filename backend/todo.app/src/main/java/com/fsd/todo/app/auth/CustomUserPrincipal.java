package com.fsd.todo.app.auth;

import com.fsd.todo.app.entities.User;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.List;
import java.util.Map;

@Getter
public class CustomUserPrincipal extends DefaultOAuth2User {
    private final User user;

    public CustomUserPrincipal(User user, Map<String, Object> attributes) {
        super(
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())),
                attributes,
                "email"
        );
        this.user = user;
    }
}
