package com.technicaltest.inventory.dto;

import java.util.Set;

import com.technicaltest.inventory.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto 
{
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Set<Role> roles;
}
