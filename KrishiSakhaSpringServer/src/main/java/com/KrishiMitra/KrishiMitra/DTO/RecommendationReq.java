package com.KrishiMitra.KrishiMitra.DTO;

import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationReq {
    @NotNull
    private boolean params;

}
