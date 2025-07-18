package com.KrishiMitra.KrishiMitra.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionCropReq {
    private boolean params;

    private CropRecReq data;
}
