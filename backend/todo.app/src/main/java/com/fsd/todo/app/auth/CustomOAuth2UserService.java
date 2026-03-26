package com.fsd.todo.app.auth;

import com.fsd.todo.app.entities.Role;
import com.fsd.todo.app.entities.User;
import com.fsd.todo.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(request);
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        System.out.println("EMAIL: "+ email);
        if (email == null) {
            throw new OAuth2AuthenticationException(("Email not Found"));
        }
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .email(email)
                                .name(name)
                                .role(Role.VIEWER)
                                .build()
                ));
        System.out.println("ATTRIBUTES: " + oauthUser.getAttributes());
        return new CustomUserPrincipal(user, oauthUser.getAttributes());
    }
}
