package com.technicaltest.inventory.service;

import java.util.Optional;

import com.technicaltest.inventory.entity.User;

public interface UserService 
{
    Optional<User> findByEmail(String email);
    public User createUser(User user); 
}
