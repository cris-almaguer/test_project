package com.technicaltest.inventory.service;

import org.springframework.http.ResponseEntity;

import com.technicaltest.inventory.dto.AuthRequestDto;
import com.technicaltest.inventory.dto.AuthenticationResponseDto;
import com.technicaltest.inventory.dto.UserDto;

public interface AuthService 
{
    public ResponseEntity<UserDto> getUser();
    public ResponseEntity<AuthenticationResponseDto> authenticateUser(AuthRequestDto request);
}
