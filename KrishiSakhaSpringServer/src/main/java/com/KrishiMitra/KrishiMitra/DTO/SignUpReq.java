package com.KrishiMitra.KrishiMitra.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpReq {
    @NotBlank
    @NotNull
    private String username = null;
    @NotBlank
    @NotNull
    private String password = null;
    @NotBlank
    @NotNull
    private String repassword = null;
    @NotBlank
    @NotNull
    private String email = null;
    @NotBlank
    @NotNull
    private String phone = null;

    @NotNull
    private AddressDTO address = null;
}
