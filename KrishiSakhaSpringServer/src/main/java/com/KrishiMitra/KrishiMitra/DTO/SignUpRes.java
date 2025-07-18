package com.KrishiMitra.KrishiMitra.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRes {
    private String username;
    private String status;
    private String msg;
    private String otpId;
}
