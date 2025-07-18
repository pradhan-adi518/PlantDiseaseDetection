package com.KrishiMitra.KrishiMitra.util;

import lombok.Data;

import java.util.List;

@Data
public class ArchiveData {
    private double latitude;
    private double longitude;
    private double generationtime_ms;
    private int utc_offset_seconds;
    private String timezone;
    private String timezone_abbreviation;
    private int elevation;
    private DailyUnits daily_units;
    private DailyData daily;

    @Data
    public static class DailyUnits {
        private String time;
        private String rain_sum;
    }

    @Data
    public static class DailyData {
        private List<String> time;
        private List<Double> rain_sum;
    }
}
