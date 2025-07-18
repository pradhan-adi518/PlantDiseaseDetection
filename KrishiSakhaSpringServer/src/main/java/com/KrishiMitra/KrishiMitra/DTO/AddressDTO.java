package com.KrishiMitra.KrishiMitra.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    @NotBlank
    @NotNull
    private String pin;

    @NotBlank
    @NotNull
    private String state;

    @NotBlank
    @NotNull
    private String district;
}
