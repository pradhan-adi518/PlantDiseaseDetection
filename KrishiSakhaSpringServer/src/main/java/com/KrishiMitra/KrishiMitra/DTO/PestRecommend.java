package com.KrishiMitra.KrishiMitra.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PestRecommend {
    private String insect;
    private List<String> pest;
    private double confidence;
}
