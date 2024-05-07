package com.technicaltest.inventory.entity;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "roles")
public class Role implements GrantedAuthority
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Override
    public String getAuthority() 
    {
        return name;
    }
}
