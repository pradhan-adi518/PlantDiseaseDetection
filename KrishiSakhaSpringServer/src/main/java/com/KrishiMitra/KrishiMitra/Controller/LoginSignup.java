package com.KrishiMitra.KrishiMitra.Controller;


import com.KrishiMitra.KrishiMitra.DTO.*;
import com.KrishiMitra.KrishiMitra.JWT.JwtUtils;
import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Models.OtpValidation;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Service.ChatService;
import com.KrishiMitra.KrishiMitra.Service.EmailService;
import com.KrishiMitra.KrishiMitra.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@Validated
public class LoginSignup {

    @Autowired
    UserService userService;

    @Autowired
    ChatService chatService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    @PostMapping("/public/login")
    public ResponseEntity<?> test(@RequestBody @Valid LoginReq req){
        System.out.println(req);
        Authentication auth;
            auth=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            req.getUsername(),req.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

        System.out.println(auth.getPrincipal());
        String jwt=jwtUtils.getJWT((User) auth.getPrincipal());
        return new ResponseEntity<LoginRes>(
                new LoginRes(
                        req.getUsername(),
                        jwt,
                        "Done",
                        "100",
                        ""
                )
                ,HttpStatus.OK);
    }


    @PostMapping("/public/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignUpReq signUpReq){
        System.out.println(signUpReq);
        if (userService.getUserByUsername(signUpReq.getUsername())!=null){
            return new ResponseEntity<SignUpRes>(new SignUpRes(signUpReq.getUsername(),
                    "200","Username Aleady Exist",null),HttpStatus.BAD_REQUEST);
        }
        if (userService.saveUser(signUpReq)==null){
            return new ResponseEntity<SignUpRes>(new SignUpRes(signUpReq.getUsername(),
                    "201","Something wrong happened",null),HttpStatus.BAD_REQUEST);
        }
        String otpID=emailService.sendOtp(signUpReq.getEmail(),signUpReq.getUsername());
        return new ResponseEntity<SignUpRes>(new SignUpRes(signUpReq.getUsername(),
                "100","done",otpID),HttpStatus.OK);
    }

    @PostMapping("/public/varify")
    public ResponseEntity<?> varify(@RequestBody @Valid VarifyReq req){
        if (!userService.varifyOtp(req)){
            return new ResponseEntity<>(new VarifyRes("not Found", "200"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<VarifyRes>(
                new VarifyRes("done","100"),
                HttpStatus.OK
        );
    }

    @PostMapping("/public/resendotp")
    public ResponseEntity<?> resendOtp(@RequestBody ResendOtpReq req){
        String otpid=emailService.resendOtp(req.getOtpId());
        if (otpid==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ResendOtpRes(otpid),HttpStatus.OK);
    }

    @PostMapping("/public/services/login")
    public  ResponseEntity<?> serviceLogin(@Valid @RequestBody LoginReq req){
        System.out.println(req);
        Officials current = chatService.getOfficial(req.getUsername());
        System.out.println(current);
        if (current==null || !Objects.equals(current.getPassword(), req.getPassword())){
            return new ResponseEntity<>(new LoginRes(req.getUsername(),null,"","101","")
            ,HttpStatus.OK);
        }
        String jwt=jwtUtils.getJWTServides(current);
        return new ResponseEntity<>(new LoginRes(
                req.getUsername(),jwt,"","100",""
        ),HttpStatus.OK);
    }

    @PostMapping("/public/resetInit")
    public ResponseEntity<?> resetInit(@Valid @RequestBody ResetInitReq req){
        User user = userService.getUserByUsername(req.getUsername());
        if (user==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String id = emailService.sendOtp(user.getEmail(),user.getUsername());
        return new ResponseEntity<>(new ResetInitRes(req.getUsername(),id),HttpStatus.OK);
    }

    @PostMapping("/public/reset")
    public  ResponseEntity<?> reset(@RequestBody @Valid ResetReq req){
        User user = userService.getUserByUsername(req.getUsername());
        if (user==null || !userService.varifyOtp(new VarifyReq(req.getOtpID(),req.getOtp()))){
            System.out.println(user);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(req.getPassword()));
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

