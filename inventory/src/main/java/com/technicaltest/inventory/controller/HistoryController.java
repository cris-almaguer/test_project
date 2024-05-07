package com.technicaltest.inventory.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.technicaltest.inventory.dto.ProductMovementDto;
import com.technicaltest.inventory.service.ProductMovementService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class HistoryController 
{
    private final String BASE_PATH = "api/v1/";

    private ProductMovementService productMovementService;

    @GetMapping(value = (BASE_PATH + "admin/movements/get"))
    public ResponseEntity<List<ProductMovementDto>> getAllMovements() 
    {
        List<ProductMovementDto> movements = productMovementService.getAllMovements();
        return new ResponseEntity<>(movements, HttpStatus.OK);
    }
}
