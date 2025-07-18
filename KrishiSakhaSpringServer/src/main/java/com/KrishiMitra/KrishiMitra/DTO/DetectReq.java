package com.KrishiMitra.KrishiMitra.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetectReq {
    private String imageName ;
    private String imageSize ;
    private String cropType;
}
