package com.KrishiMitra.KrishiMitra.Models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
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
public class CropRecommend {

    @Id
    @NotBlank @NotNull
    private String name;

    @JsonProperty("kannadaName")
    private String kannada_name;
    private String scientificName;
    private String climateRequirements;
    private String soilType;
    private String wateringNeeds;
    private String growingSeason;
    @NotNull
    private Tips tips;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Tips{
        List<String> kannada;
        List<String> english;
    }
}
