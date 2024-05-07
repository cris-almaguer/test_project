package com.technicaltest.inventory.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technicaltest.inventory.entity.User;
import com.technicaltest.inventory.repository.UserRepository;
import com.technicaltest.inventory.service.UserService;

@Service
public class UserServiceImpl implements UserService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> findByEmail(String email) 
    {
        return userRepository.findByEmail(email);
    }

    @Override
    public User createUser(User user) 
    {
        return userRepository.save(user);
    }
}
