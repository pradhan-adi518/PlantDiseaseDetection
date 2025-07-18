package com.KrishiMitra.KrishiMitra.Exception;


import com.KrishiMitra.KrishiMitra.CustomExceptionsClasses.UserDisabled;
import com.KrishiMitra.KrishiMitra.DTO.LoginRes;
import com.KrishiMitra.KrishiMitra.DTO.RefreshJwt;
import com.KrishiMitra.KrishiMitra.JWT.JwtUtils;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Service.EmailService;
import com.KrishiMitra.KrishiMitra.Service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalHandler {

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    @Autowired
    JwtUtils jwtUtils;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgs(MethodArgumentNotValidException ex){
        Map<String,String> map=new HashMap<>();
        map.put("status","201");
        map.put("msg","invalid arguments");
        return new ResponseEntity<Map<String,String>>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDisabled.class)
    public ResponseEntity<?> usResponse(UserDisabled e){
        User user=userService.getUserByUsername(e.getUsername());
        String otp=emailService.sendOtp(user.getEmail(),user.getUsername());
        return new ResponseEntity<LoginRes>(
                new LoginRes(
                        user.getUsername(),
                        null,
                        "User disabled",
                        "204",
                        otp
                )
                ,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> usernameNotFound(UsernameNotFoundException e){
            System.out.println(e.toString());
            return new ResponseEntity<LoginRes>(
                    new LoginRes(
                            e.getMessage(),
                            null,
                            "invalid credentials",
                            "203",
                            ""
                    )
                    ,HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> bad(BadCredentialsException e){
        System.out.println(e.toString());
        return new ResponseEntity<LoginRes>(
                new LoginRes(
                        e.getMessage(),
                        null,
                        "invalid credentials",
                        "203",
                        ""
                )
                ,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> noBody(HttpMessageNotReadableException e){
        return new ResponseEntity<>(
                Map.of("status","No body or Body is not readable")
                ,HttpStatus.FORBIDDEN);
    }

}
