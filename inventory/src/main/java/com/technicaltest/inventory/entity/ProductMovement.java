package com.technicaltest.inventory.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "product_movements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductMovement 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String type; 

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime dateTime = LocalDateTime.now();
}
