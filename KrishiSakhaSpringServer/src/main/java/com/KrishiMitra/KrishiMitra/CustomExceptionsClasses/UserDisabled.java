package com.KrishiMitra.KrishiMitra.CustomExceptionsClasses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDisabled extends RuntimeException{
    private String username;
}
