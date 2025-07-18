package com.KrishiMitra.KrishiMitra.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetReq {

    private String username;
    private String password;
    private String otpID;
    private String otp;
}
