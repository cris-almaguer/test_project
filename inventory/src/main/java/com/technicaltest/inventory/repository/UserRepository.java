package com.technicaltest.inventory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technicaltest.inventory.entity.User;

public interface UserRepository extends JpaRepository<User, Long> 
{
    Optional<User> findByEmail(String email);
}
