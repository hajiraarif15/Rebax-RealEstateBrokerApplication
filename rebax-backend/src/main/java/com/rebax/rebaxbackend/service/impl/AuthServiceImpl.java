package com.rebax.rebaxbackend.service.impl;

import com.rebax.rebaxbackend.dto.AuthRequest;
import com.rebax.rebaxbackend.dto.AuthResponse;
import com.rebax.rebaxbackend.dto.RegisterRequest;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.repository.UserRepository;
import com.rebax.rebaxbackend.service.AuthService;
import com.rebax.rebaxbackend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwt;

    @Override
    public AuthResponse register(RegisterRequest r) {

        User user = User.builder()
                .name(r.getName())
                .email(r.getEmail())
                .password(encoder.encode(r.getPassword()))
                .role(r.getRole())
                .build();

        user = repo.save(user);

        return AuthResponse.builder()
                .token(jwt.generate(user))
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }

    @Override
    public AuthResponse login(AuthRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User u = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid login credentials"));

        return AuthResponse.builder()
                .token(jwt.generate(u))
                .userId(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole())
                .build();
    }
}
