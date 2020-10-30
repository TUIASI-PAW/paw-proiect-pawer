package com.pf.boundries.dto.read;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
