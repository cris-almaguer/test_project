package com.technicaltest.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technicaltest.inventory.entity.ProductMovement;

public interface ProductMovementRepository extends JpaRepository<ProductMovement, Long> {}
