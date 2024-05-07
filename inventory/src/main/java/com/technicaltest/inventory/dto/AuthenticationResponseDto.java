package com.technicaltest.inventory.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
@Builder
public class AuthenticationResponseDto 
{
    private final String accessToken;
    private final String tokenType = "Bearer";
    private final Date expiresAt;
}