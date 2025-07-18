package com.KrishiMitra.KrishiMitra.DTO;


import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetectRes {
    private boolean isHealthy;
    private boolean detected;
    private double confidence;
    private DiseasesModel disease;
}

