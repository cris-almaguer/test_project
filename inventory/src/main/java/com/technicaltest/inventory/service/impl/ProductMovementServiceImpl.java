package com.technicaltest.inventory.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.technicaltest.inventory.dto.ProductMovementDto;
import com.technicaltest.inventory.mapper.ProductMovementMapper;
import com.technicaltest.inventory.repository.ProductMovementRepository;
import com.technicaltest.inventory.service.ProductMovementService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductMovementServiceImpl implements ProductMovementService
{
    private ProductMovementRepository productMovementRepository;

    @Override
    public List<ProductMovementDto> getAllMovements() 
    {
        return productMovementRepository.findAll().stream().map(pmv -> ProductMovementMapper.mapToProductMovementDto(pmv)).collect(Collectors.toList());
    }
}
