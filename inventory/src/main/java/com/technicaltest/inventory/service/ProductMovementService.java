package com.technicaltest.inventory.service;

import java.util.List;

import com.technicaltest.inventory.dto.ProductMovementDto;

public interface ProductMovementService 
{
    public List<ProductMovementDto> getAllMovements();
}
