package com.technicaltest.inventory.mapper;

import com.technicaltest.inventory.dto.ProductDto;
import com.technicaltest.inventory.entity.Product;

public class ProductMapper 
{
    public static ProductDto mapToProductDto(Product product)
    {
        return new ProductDto
        (
            product.getId(),
            product.getName(),
            product.getQuantity(),
            product.isActive()
        );
    }

    public static Product mapToProduct(ProductDto productDto)
    {
        return new Product
        (
            productDto.getId(),
            productDto.getName(),
            productDto.getQuantity(),
            productDto.isActive()
        );
    }
}
