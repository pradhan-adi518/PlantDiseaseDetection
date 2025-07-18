package com.KrishiMitra.KrishiMitra.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRes {
    private String username;
    private String jwt;
    private String msg;
    private String status;
    private String otpId;
}
