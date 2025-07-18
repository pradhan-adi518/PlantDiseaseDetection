package com.KrishiMitra.KrishiMitra.util;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherData {
    private double latitude;
    private double longitude;
    private String generationtime_ms;  // matches the JSON key
    private int utc_offset_seconds;
    private String timezone;
    private String timezone_abbreviation;  // matches the JSON key
    private double elevation;
    private CurrentUnitsDTO current_units;  // matches the JSON key
    private CurrentWeatherDTO current;

    @Data
    public static class CurrentUnitsDTO {
        private String time;
        private String interval;
        private String temperature_2m;  // matches the JSON key
        private String relative_humidity_2m;  // matches the JSON key
        private String rain;
        private String weather_code;
        private String wind_speed_10m;
        private String wind_direction_10m;
    }

    @Data
    public static class CurrentWeatherDTO {
        private String time;
        private int interval;
        private double temperature_2m;  // matches the JSON key
        private int relative_humidity_2m;  // matches the JSON key
        private double rain;
        private int weather_code;
        private double wind_speed_10m;
        private double wind_direction_10m;
    }
}
