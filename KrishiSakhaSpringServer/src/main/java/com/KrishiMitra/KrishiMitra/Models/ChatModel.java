package com.KrishiMitra.KrishiMitra.Models;


import com.KrishiMitra.KrishiMitra.util.Messege;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatModel {
    @Id
    private String id;

    private String username;

    private String chatWith;

    @JsonIgnore
    private Instant sessionTime;

    @JsonIgnore
    private Instant lastActive;

    @JsonIgnore
    private boolean isActive;

    private List<Messege> messages;
}
