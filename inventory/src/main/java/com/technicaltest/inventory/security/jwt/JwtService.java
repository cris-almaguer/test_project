package com.technicaltest.inventory.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.technicaltest.inventory.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService 
{
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    public String extractUsername(String jwtToken) 
    {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) 
    {
        final Claims claims = getAllClaimsFromToken(jwtToken);
        return claimsResolver.apply(claims);
    }

    public String generateJwtToken(Map<String, Object> extraClaims, UserDetails userDetails) 
    {
        Map<String, Object> claims = new HashMap<>(extraClaims);
        
        String roles = userDetails.getAuthorities().stream()
                .map(authority -> ((SimpleGrantedAuthority) authority).getAuthority())
                .collect(Collectors.joining(","));
        
        claims.put("roles", roles);

        if (userDetails instanceof User) 
        {
            User user = (User) userDetails;
            claims.put("firstName", user.getFirstName());
            claims.put("lastName", user.getLastName());
        }

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2))
                .signWith(getSignInKey())
                .compact();
    }

    public String generateJwtToken(UserDetails userDetails) 
    {
        return generateJwtToken(new HashMap<>(), userDetails);
    }

    public boolean isJwtTokenValid(String jwtToken, UserDetails userDetails) 
    {
        final String username = extractUsername(jwtToken);
        return (username.equals(userDetails.getUsername())) && !isJwtTokenExpired(jwtToken);
    }

    private boolean isJwtTokenExpired(String jwtToken) 
    {
        return extractExpiration(jwtToken).before(new Date());
    }

    public Date extractExpiration(String jwtToken) 
    {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    private Claims getAllClaimsFromToken(String jwtToken) 
    {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();
    }

    private SecretKey getSignInKey() 
    { 
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
