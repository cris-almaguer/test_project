package com.technicaltest.inventory.init;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.technicaltest.inventory.entity.Role;
import com.technicaltest.inventory.entity.User;
import com.technicaltest.inventory.repository.RoleRepository;
import com.technicaltest.inventory.repository.UserRepository;

@Component
@Configuration
public class AppDataSeeder implements CommandLineRunner
{
    private final String ROLE_ADMIN_CONST = "ROLE_ADMIN", ROLE_WAREHOUSEMAN_CONST = "ROLE_WAREHOUSEMAN";
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Bean
    public PasswordEncoder encoder() 
    {
        return new BCryptPasswordEncoder(11);
    }

    @Override
    public void run(String... args) throws Exception 
    {
        if (userRepository.count() < 1 && roleRepository.count() < 1) 
        {
            Role roleAdmin = Role.builder().name(ROLE_ADMIN_CONST).build();
            Role roleWarehouseman = Role.builder().name(ROLE_WAREHOUSEMAN_CONST).build();
            
            roleRepository.saveAll(List.of(roleAdmin, roleWarehouseman));
            
            User userAdmin = User.builder()
                            .firstName("Usuario")
                            .lastName("Administrador")
                            .email("admin@test.com")
                            .password(encoder().encode("test@2024"))
                            .build();

            userAdmin.getRoles().add(roleRepository.findByName(ROLE_ADMIN_CONST).get());

            User userWarehouseman = User.builder()
                            .firstName("Usuario")
                            .lastName("Almacenista")
                            .email("almacenista@test.com")
                            .password(encoder().encode("test@2024"))
                            .build();

            userWarehouseman.getRoles().add(roleRepository.findByName(ROLE_WAREHOUSEMAN_CONST).get());

            userRepository.saveAll(List.of(userAdmin, userWarehouseman));
            
            System.out.println("Records succesfully added!");
        }
    }
}
