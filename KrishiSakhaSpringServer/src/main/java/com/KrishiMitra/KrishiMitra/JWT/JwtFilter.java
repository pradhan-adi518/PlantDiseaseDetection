package com.KrishiMitra.KrishiMitra.JWT;

import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.UserRepo;
import com.KrishiMitra.KrishiMitra.Service.ChatService;
import com.KrishiMitra.KrishiMitra.Service.UserDetailServiceImpl;
import com.KrishiMitra.KrishiMitra.Service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtils utils;

    @Autowired
    UserRepo userRepo;

    @Autowired
    @Lazy
    ChatService chatService;

    @Autowired
    @Lazy
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println(request.getRemoteAddr());

        if (request.getRequestURI().startsWith("/public")){
            filterChain.doFilter(request,response);
            return;
        }
        if (request.getRequestURI().startsWith("/services")){
                String jwt=utils.getJwtfromHeader(request);
                try {
                    if (jwt==null || !utils.validateJwt(jwt)) return;
                }catch (ExpiredJwtException e){
                    String pin=e.getClaims().getSubject();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.addHeader("Authentication","bearer " + utils.getJWTServides(
                            chatService.getOfficial(pin)
                    ));
                    return;
                }
                filterChain.doFilter(request,response);
                return;
        }
        if (request.getRequestURI().startsWith("/local")){
            if (!("127.0.0.1".equals(request.getRemoteAddr()) || "0:0:0:0:0:0:0:1".equals(request.getRemoteAddr()))) {
                response.sendError(HttpStatus.FORBIDDEN.value());
                return;
            }
            else {
                filterChain.doFilter(request,response);
                return;
            }
        }

        String jwt = utils.getJwtfromHeader(request);
        try{
            if (jwt==null || !utils.validateJwt(jwt)){
                return;
            }
        }
        catch (ExpiredJwtException e){

            String username=e.getClaims().getSubject();
            User user= userService.getUserByUsername(username);

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.addHeader("Authentication","bearer " + utils.getJWT(user));
            return;
        }


        Claims claims=utils.getClaims(jwt);
        User principal= userRepo.findByUsername(claims.getSubject());
        if (!principal.isEnabled()){
            response.sendError(HttpStatus.UNAUTHORIZED.value());
        }
        UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(
                principal,null, principal.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request,response);
    }
}
