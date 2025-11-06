package com.rebax.rebaxbackend.dto;

import com.rebax.rebaxbackend.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class AuthResponse {
    String token;
    Long userId;
    String name;
    String email;
    Role role;
}
