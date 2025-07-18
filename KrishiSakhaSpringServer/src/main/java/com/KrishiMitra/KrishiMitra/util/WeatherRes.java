package com.KrishiMitra.KrishiMitra.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class WeatherRes {
    private WeatherData weather;
    private NPKvalues npk;
}
