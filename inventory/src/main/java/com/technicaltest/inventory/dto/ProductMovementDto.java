package com.technicaltest.inventory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductMovementDto 
{
    private Long id;
    private ProductDto product;
    private String type; 
    private UserDto user;
    private LocalDateTime dateTime;
}
