package com.KrishiMitra.KrishiMitra.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionRes {
    private Integer max;
    private double confidence;
    private String id;
}
