package com.technicaltest.inventory.service;

import java.util.Optional;

import com.technicaltest.inventory.entity.Role;

public interface RoleService 
{
    Optional<Role> findByName(String name); 
}
