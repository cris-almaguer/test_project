package com.technicaltest.inventory.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDto 
{  
    @NotNull
    @Email 
    private String email;
    @NotNull
    private String password;
}
