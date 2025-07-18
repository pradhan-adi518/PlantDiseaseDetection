package com.KrishiMitra.KrishiMitra.DTO;

import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import com.KrishiMitra.KrishiMitra.Models.FertilizerRecommendModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PredictionFerRes {
    private boolean isAvailable;
    private FertilizerRecommendModel recommend;
}

