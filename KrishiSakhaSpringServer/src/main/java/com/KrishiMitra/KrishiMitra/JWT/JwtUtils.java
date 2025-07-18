package com.KrishiMitra.KrishiMitra.JWT;


import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtils {


    @Value("${spring.jwt.key}")
    String key;

    @Value("${spring.jwt.jwtexpire}")
    int expiration;

    public  String getJwtfromHeader(HttpServletRequest request){
        String header=request.getHeader("Authentication");
        if (header==null || !header.startsWith("bearer") && header.length()<7){
            return null;
        }
        return header.substring(7);
    }

    public String getServiceProvider(String token){
        String jwt=token.substring(7);
        return getClaims(jwt).getSubject();
    }

    public Boolean validateJwt(String token){
        try {
             Jwts.parser().verifyWith((SecretKey) getkey()).build().parseSignedClaims(token)
                     .getPayload();
             return true;
        }
        catch (ExpiredJwtException e){
            System.out.println("expires");
            throw e;
        }
        catch (Exception e){
            return false;
        }
    }

    public Claims getClaims(String token){
       return Jwts.parser().verifyWith((SecretKey) getkey()).build().parseSignedClaims(token)
                .getPayload();
    }

    public String getJWT(User user){
        Map<String ,String> claims=new HashMap<>();
        claims.put("email",user.getEmail());
        claims.put("type","web");
        return Jwts.builder().signWith(getkey())
                .subject(user.getUsername())
                .claims(claims)
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+expiration))
                .compact();
    }

    private Key getkey(){
        byte[] newkey=key.getBytes();
        return Keys.hmacShaKeyFor(newkey);
    }

    public String getJWTServides(Officials official){
        Map<String ,String> claims=new HashMap<>();
        claims.put("email",official.getEmail());
        return Jwts.builder().signWith(getkey())
                .subject(official.getPin())
                .claims(claims)
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+expiration))
                .compact();
    }
}
