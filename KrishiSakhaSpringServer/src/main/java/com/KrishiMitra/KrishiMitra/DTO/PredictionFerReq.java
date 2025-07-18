package com.KrishiMitra.KrishiMitra.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionFerReq {
    @NotNull
    private Double n;
    @NotNull
    private Double p;
    @NotNull
    private Double k;
}
