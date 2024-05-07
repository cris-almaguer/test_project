package com.technicaltest.inventory.service.impl;

import java.util.Date;
import java.util.NoSuchElementException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.stereotype.Service;

import com.technicaltest.inventory.dto.AuthRequestDto;
import com.technicaltest.inventory.dto.AuthenticationResponseDto;
import com.technicaltest.inventory.dto.UserDto;
import com.technicaltest.inventory.entity.User;
import com.technicaltest.inventory.mapper.UserMapper;
import com.technicaltest.inventory.security.jwt.JwtService;
import com.technicaltest.inventory.service.AuthService;
import com.technicaltest.inventory.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService
{
    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @Override
    public ResponseEntity<UserDto> getUser() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con correo: " + userDetails.getUsername()));
        return new ResponseEntity<>(UserMapper.mapToUserDto(user), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AuthenticationResponseDto> authenticateUser(AuthRequestDto request)
    {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userService.findByEmail(request.getEmail()).orElseThrow();
        String jwtAccessToken = jwtService.generateJwtToken((user));
        Date expiresAt = jwtService.extractExpiration(jwtAccessToken);
        return new ResponseEntity<>(AuthenticationResponseDto.builder().accessToken(jwtAccessToken).expiresAt(expiresAt).build(), HttpStatus.OK);
    }
}
