package com.technicaltest.inventory.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto 
{
    private Long id;
    @NotNull
    private String name;
    private int quantity;
    private boolean isActive;
}