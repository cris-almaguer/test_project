package com.technicaltest.inventory.service;

import java.util.List;
import com.technicaltest.inventory.dto.ProductDto;

public interface ProductService 
{
    public List<ProductDto> getAllProducts();
    public List<ProductDto> getActiveProducts();
    public ProductDto addProduct(ProductDto productDto);
    public ProductDto increaseQuantity(Long productId, int quantity);
    public ProductDto decreaseQuantity(Long productId, int quantity);
    public ProductDto toggleStatusProduct(Long productId);
}
