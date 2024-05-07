package com.technicaltest.inventory.mapper;

import com.technicaltest.inventory.dto.UserDto;
import com.technicaltest.inventory.entity.User;

public class UserMapper 
{
    public static UserDto mapToUserDto(User user)
    {
        return new UserDto
        (
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRoles()
        );
    }   
}
