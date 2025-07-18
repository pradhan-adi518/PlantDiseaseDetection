package com.KrishiMitra.KrishiMitra.DTO;

import lombok.Data;

import java.util.List;

@Data
public class CoOrdinatesRes {
    private long place_id;
    private String licence;
    private String lat;
    private String lon;
    private String classType;
    private String type;
    private int place_rank;
    private double importance;
    private String addresstype;
    private String name;
    private String display_name;
    private List<String> boundingbox;

}
