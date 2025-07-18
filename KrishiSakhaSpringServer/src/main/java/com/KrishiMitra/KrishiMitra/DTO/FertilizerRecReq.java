package com.KrishiMitra.KrishiMitra.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FertilizerRecReq {
    @NotNull
    private Double n; // Nitrogen content

    @NotNull
    private Double p; // Phosphorus content

    @NotNull
    private Double k;
}
