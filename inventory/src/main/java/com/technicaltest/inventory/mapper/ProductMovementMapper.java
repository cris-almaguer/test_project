package com.technicaltest.inventory.mapper;

import com.technicaltest.inventory.dto.ProductMovementDto;
import com.technicaltest.inventory.entity.ProductMovement;

public class ProductMovementMapper 
{
    public static ProductMovementDto mapToProductMovementDto(ProductMovement productMovement)
    {
        return new ProductMovementDto
        (
            productMovement.getId(),
            ProductMapper.mapToProductDto(productMovement.getProduct()),
            productMovement.getType(),
            UserMapper.mapToUserDto(productMovement.getUser()),
            productMovement.getDateTime()            
        );
    }
}
