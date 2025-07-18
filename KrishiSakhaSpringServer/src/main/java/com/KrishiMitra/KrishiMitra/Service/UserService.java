package com.KrishiMitra.KrishiMitra.Service;


import com.KrishiMitra.KrishiMitra.DTO.SignUpReq;
import com.KrishiMitra.KrishiMitra.DTO.VarifyReq;
import com.KrishiMitra.KrishiMitra.Models.OtpValidation;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.OtpRepo;
import com.KrishiMitra.KrishiMitra.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    OtpRepo otpRepo;

    public String saveUser(SignUpReq signUpReq){
        try {
            userRepo.insert(new User( null,
                    signUpReq.getUsername(),
                    encoder.encode(signUpReq.getPassword()),
                    false,
                    signUpReq.getEmail(),
                    signUpReq.getPhone(),
                    signUpReq.getAddress(),
                    ""
            ));
            return "done";
        }catch (Exception e){
            return null;
        }
    }

    public User getUserByUsername(String username){
        return userRepo.findByUsername(username);
    }
    public void saveUser(User user){
        userRepo.save(user);
    }
    public boolean varifyOtp(VarifyReq req){
        Optional<OtpValidation> current=otpRepo.findById(req.getOtpId());
        if (current.isEmpty()) return false;
        if (current.get().getOtp().equals(req.getOtp())){
            enableUser(current.get().getUsername());
            return true;
        }
        return false;
    }

    private void enableUser(String username){
        User user=userRepo.findByUsername(username);
        user.setEnabled(true);
        userRepo.save(user);
    }

    public boolean resetInit(String username){
        User user=userRepo.findByUsername(username);
        if (user==null) return false;
        user.setEnabled(false);
        return true;
    }
}
