package com.KrishiMitra.KrishiMitra.Models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class FertilizerRecommendModel {
    @Id @NotNull
    private String name;
    private String scientificName;
    private String NPK_Composition;
    private List<String> recommendedCrops;
    private String applicationRate;
    private String bestTimeToApply;
    private List<String> benefits;
    private List<String> potentialRisks;
    private String storageAndHandling;
    private String costEstimate;
    private String organicVsSynthetic;
    private Tips tips;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Tips {
        private List<String> kannada;
        private List<String> english;
    }
}
