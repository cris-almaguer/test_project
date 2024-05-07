package com.technicaltest.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technicaltest.inventory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
