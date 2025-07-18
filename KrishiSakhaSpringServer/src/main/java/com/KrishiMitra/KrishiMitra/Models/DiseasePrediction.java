package com.KrishiMitra.KrishiMitra.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class DiseasePrediction {
    @Id
    private String Id;

    private String username;

    private String image;

    private String resultId;
}
