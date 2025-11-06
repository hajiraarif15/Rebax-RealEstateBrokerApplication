package com.rebax.rebaxbackend.dto;


import lombok.Data;

@Data
public class AuthRequest {
    String email;
    String password;
}
