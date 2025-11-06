package com.rebax.rebaxbackend.dto;



import com.rebax.rebaxbackend.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    String name;
    String email;
    String password;
    Role role;
}
