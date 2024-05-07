package com.technicaltest.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.technicaltest.inventory.security.SecurityRoles;
import com.technicaltest.inventory.security.jwt.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig 
{
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/user").hasAnyAuthority(SecurityRoles.ROLE_ADMIN, SecurityRoles.ROLE_WAREHOUSEMAN)
                        .requestMatchers("/api/v1/auth/authenticate").permitAll()
                        .requestMatchers("/api/v1/admin/**").hasAuthority(SecurityRoles.ROLE_ADMIN)
                        .requestMatchers("/api/v1/warehouseman/**").hasAuthority(SecurityRoles.ROLE_WAREHOUSEMAN)
                        .requestMatchers("/api/v1/any/**").hasAnyAuthority(SecurityRoles.ROLE_ADMIN, SecurityRoles.ROLE_WAREHOUSEMAN)
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
