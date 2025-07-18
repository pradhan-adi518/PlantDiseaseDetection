package com.KrishiMitra.KrishiMitra.Service;


import com.KrishiMitra.KrishiMitra.Models.OtpValidation;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.OtpRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    OtpRepo otpRepo;

    @Autowired
    KafkaService kafkaService;

    @Autowired
    UserService userService;

    ObjectMapper mapper=new ObjectMapper();

    public String sendOtp(String email,String username){
        String otp=getOtp();
        OtpValidation current= otpRepo.insert(new OtpValidation(null,otp,username));
        Map<String,String> map=new HashMap<>();
        map.put("to",email);
        map.put("otp",otp);
        try{
            kafkaService.emit("krishi-email-otp",mapper.writeValueAsString(map));
            return current.getOtpId();
        }
        catch (Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    public String resendOtp(String OtpId){
        Optional<OtpValidation> curent=otpRepo.findById(OtpId);
        if (curent.isEmpty()) return null;
        User user= userService.getUserByUsername(curent.get().getUsername());
        if (user==null) return null;
        return sendOtp(user.getEmail(),user.getUsername());
    }
    private String getOtp(){
        Random r=new Random();
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<6;i++){
            sb.append(r.nextInt(9));
        }
        return sb.toString();
    }
}
