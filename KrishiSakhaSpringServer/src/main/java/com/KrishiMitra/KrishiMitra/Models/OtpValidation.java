package com.KrishiMitra.KrishiMitra.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class OtpValidation {

    @Id
    private String otpId;
    private String otp;
    private String username;

}
