package com.technicaltest.inventory.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.technicaltest.inventory.dto.ProductDto;
import com.technicaltest.inventory.entity.Product;
import com.technicaltest.inventory.entity.ProductMovement;
import com.technicaltest.inventory.entity.User;
import com.technicaltest.inventory.mapper.ProductMapper;
import com.technicaltest.inventory.repository.ProductMovementRepository;
import com.technicaltest.inventory.repository.ProductRepository;
import com.technicaltest.inventory.service.ProductService;
import com.technicaltest.inventory.service.UserService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService
{
    private ProductRepository productRepository;
    private ProductMovementRepository productMovementRepository;
    private UserService userService;
    private final String INCREASE_TYPE_CONST = "INCREASE_INVENTORY", DECREASE_TYPE_CONST = "DECREASE_INVENTORY";

    @Override
    public List<ProductDto> getAllProducts() 
    {
        return productRepository.findAll().stream().map(product -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getActiveProducts() 
    {
        return productRepository.findAll().stream().filter(product -> product.isActive()).map(product -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ProductDto addProduct(ProductDto productDto) 
    {
        Product product = ProductMapper.mapToProduct(productDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Transactional
    @Override
    public ProductDto toggleStatusProduct(Long productId) 
    {
        Product product = productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException("Producto no encontrado con ID: " + productId));
        product.setActive(!product.isActive());
        Product savedProduct = productRepository.save(product);

        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Transactional
    @Override
    public ProductDto increaseQuantity(Long productId, int quantity) 
    {
        if (quantity <= 0) 
        {
            throw new IllegalArgumentException("La cantidad adicional debe ser positiva para incrementar el inventario.");
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException("Producto no encontrado con ID: " + productId));
        int newQuantity = product.getQuantity() + quantity;

        if (newQuantity < product.getQuantity()) 
        {
            throw new IllegalArgumentException("El incremento resulta en una cantidad de inventario menor que la actual. Operación no permitida.");
        }

        product.setQuantity(newQuantity);
        Product savedProduct = productRepository.save(product);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con correo: " + userDetails.getUsername()));

        ProductMovement productMovement = ProductMovement.builder()
                                                         .user(user)
                                                         .type(INCREASE_TYPE_CONST)
                                                         .product(savedProduct)
                                                         .dateTime(LocalDateTime.now())
                                                         .build();

        productMovementRepository.save(productMovement);

        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Transactional
    @Override
    public ProductDto decreaseQuantity(Long productId, int quantity) 
    {
        if (quantity <= 0) 
        {
            throw new IllegalArgumentException("La cantidad adicional debe ser positiva para decrementar el inventario.");
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException("Producto no encontrado con ID: " + productId));
        int newQuantity = product.getQuantity() - quantity;

        if (newQuantity > product.getQuantity()) 
        {
            throw new IllegalArgumentException("El decremento requerido resulta en una cantidad no disponible en el inventario. Operación no permitida.");
        }

        product.setQuantity(newQuantity);
        Product savedProduct = productRepository.save(product);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con correo: " + userDetails.getUsername()));

        ProductMovement productMovement = ProductMovement.builder()
                                                         .user(user)
                                                         .type(DECREASE_TYPE_CONST)
                                                         .product(savedProduct)
                                                         .dateTime(LocalDateTime.now())
                                                         .build();

        productMovementRepository.save(productMovement);

        return ProductMapper.mapToProductDto(savedProduct);
    } 
}

