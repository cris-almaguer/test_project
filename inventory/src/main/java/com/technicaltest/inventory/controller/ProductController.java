package com.technicaltest.inventory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.technicaltest.inventory.dto.ProductDto;
import com.technicaltest.inventory.service.ProductService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@AllArgsConstructor
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController 
{
    private ProductService productService;
    private final String BASE_PATH = "api/v1/";

    @GetMapping(value = (BASE_PATH + "any/products/get"))
    public ResponseEntity<List<ProductDto>> getAllProducts() 
    {
        List<ProductDto> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping(value = (BASE_PATH + "any/products/get/active"))
    public ResponseEntity<List<ProductDto>> getActiveProducts() 
    {
        List<ProductDto> products = productService.getActiveProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping(value = (BASE_PATH + "admin/products/add"))
    public ResponseEntity<ProductDto> addProduct(@RequestBody @Valid ProductDto productDto) 
    {
        ProductDto savedProductDto = productService.addProduct(productDto);
        return new ResponseEntity<>(savedProductDto, HttpStatus.CREATED);
    }

    @PutMapping(value = (BASE_PATH + "admin/product/increase/{id}/{quantity}"))
    public ResponseEntity<ProductDto> increaseQuantity(@PathVariable("id") Long productId, @PathVariable("quantity") @NotNull @Min(1) int quantity) 
    {
        ProductDto product = productService.increaseQuantity(productId, quantity);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping(value = (BASE_PATH + "warehouseman/product/decrease/{id}/{quantity}"))
    public ResponseEntity<ProductDto> decreaseQuantity(@PathVariable("id") Long productId, @PathVariable("quantity") @RequestBody @NotNull @Min(1) int quantity) 
    {
        ProductDto product = productService.decreaseQuantity(productId, quantity);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PatchMapping(value = (BASE_PATH + "admin/product/toggle/{id}"))
    public ResponseEntity<ProductDto> toggleStatusProduct(@PathVariable("id") Long productId) 
    {
        ProductDto product = productService.toggleStatusProduct(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
