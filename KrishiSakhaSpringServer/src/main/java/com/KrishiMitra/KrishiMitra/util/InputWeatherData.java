package com.KrishiMitra.KrishiMitra.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputWeatherData {
    private double humidity;
    private double rain;
    private double temp;
}
