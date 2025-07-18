package com.KrishiMitra.KrishiMitra.DTO;


import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.util.Messege;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionChatRes {

    @JsonProperty("isAvailable")
    private boolean isAvailable;
    private Officials official;
    private String chatID;
    private List<Messege> chatList;
}
