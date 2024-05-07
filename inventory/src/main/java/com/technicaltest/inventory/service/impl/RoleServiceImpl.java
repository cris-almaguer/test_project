package com.technicaltest.inventory.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technicaltest.inventory.entity.Role;
import com.technicaltest.inventory.repository.RoleRepository;
import com.technicaltest.inventory.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService
{
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(String name) 
    {
        return roleRepository.findByName(name);
    }
}
