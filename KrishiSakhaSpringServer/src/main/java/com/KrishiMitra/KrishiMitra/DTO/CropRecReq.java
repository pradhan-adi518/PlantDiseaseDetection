package com.KrishiMitra.KrishiMitra.DTO;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CropRecReq {
    @NotNull
    private Double n; // Nitrogen content

    @NotNull
    private Double p; // Phosphorus content

    @NotNull
    private Double k; // Potassium content

    @NotNull
    private Double temperature; // Temperature in Celsius

    @NotNull
    private Double humidity; // Relative Humidity in percentage

    @NotNull
    private Double ph; // pH value of the soil

    @NotNull
    private Double rainfall; // Rainfall in mm
}
