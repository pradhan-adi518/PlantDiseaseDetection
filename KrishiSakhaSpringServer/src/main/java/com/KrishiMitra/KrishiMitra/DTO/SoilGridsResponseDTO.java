package com.KrishiMitra.KrishiMitra.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoilGridsResponseDTO {
    private String type;  // Added the missing 'type' field at the top level
    private Geometry geometry;
    private Properties properties;
    private double query_time_s;

    @Data
    public static class Geometry {
        private String type;
        private double[] coordinates;
    }

    @Data
    public static class Properties {
        private List<Layer> layers;

        @Data
        public static class Layer {
            private String name;
            private UnitMeasure unit_measure;
            private List<Depth> depths;
        }

        @Data
        public static class UnitMeasure {
            private int d_factor;
            private String mapped_units;
            private String target_units;
            private String uncertainty_unit;
        }

        @Data
        public static class Depth {
            private Range range;
            private String label;
            private Values values;
        }

        @Data
        public static class Range {
            private int top_depth;
            private int bottom_depth;
            private String unit_depth;
        }

        @Data
        public static class Values {
            private double mean;
        }
    }
}
