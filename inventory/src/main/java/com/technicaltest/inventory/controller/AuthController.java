package com.technicaltest.inventory.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.technicaltest.inventory.dto.AuthRequestDto;
import com.technicaltest.inventory.dto.AuthenticationResponseDto;
import com.technicaltest.inventory.dto.UserDto;
import com.technicaltest.inventory.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController 
{
    private final AuthService authenticationService;

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser() 
    {
        return authenticationService.getUser();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticateUser(@Valid @RequestBody AuthRequestDto request) 
    {
        return authenticationService.authenticateUser(request);
    }
}
