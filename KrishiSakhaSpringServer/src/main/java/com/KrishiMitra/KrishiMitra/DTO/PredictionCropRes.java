package com.KrishiMitra.KrishiMitra.DTO;

import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionCropRes {
    private boolean isAvailable;
    private CropRecommend recommend;
}
