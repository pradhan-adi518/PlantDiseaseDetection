package com.KrishiMitra.KrishiMitra.Models;

import com.KrishiMitra.KrishiMitra.util.InputWeatherData;
import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveRecommendation {
    @Id
    private String id;

    private String username;

    private NPKvalues npKvalues;

    private InputWeatherData inputWeatherData;

    private String resultId;
}
