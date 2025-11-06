package com.rebax.rebaxbackend.controller;


import com.rebax.rebaxbackend.dto.*;
import com.rebax.rebaxbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService svc;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest r){
        return svc.register(r);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest r){
        return svc.login(r);
    }
}
