package com.KrishiMitra.KrishiMitra.util;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageAdd {
    @NotBlank @NotNull
    String id;

    @NotNull
    Messege messege;
}
