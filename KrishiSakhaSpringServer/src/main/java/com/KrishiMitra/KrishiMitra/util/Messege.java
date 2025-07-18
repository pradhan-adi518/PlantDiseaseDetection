package com.KrishiMitra.KrishiMitra.util;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Messege {
    private String from;
    private String to;
    private String msg;
    private long index;
}
