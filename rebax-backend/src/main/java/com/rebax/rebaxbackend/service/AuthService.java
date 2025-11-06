package com.rebax.rebaxbackend.service;



import com.rebax.rebaxbackend.dto.*;
public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}
