package com.KrishiMitra.KrishiMitra.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VarifyReq {

    @NotBlank
    @NotNull
    private String otpId;

    @NotNull
    @NotBlank
    private String otp;

}
