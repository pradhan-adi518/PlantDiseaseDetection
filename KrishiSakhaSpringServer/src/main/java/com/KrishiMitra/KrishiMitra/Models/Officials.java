package com.KrishiMitra.KrishiMitra.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Officials {
    @Id
    private String Id;
    @NotNull @NotBlank
    private String name;
    @NotNull @NotBlank @JsonIgnore
    private String password;
    @NotNull @NotBlank
    private String pin;
    @NotNull @NotBlank
    private String phone;
    @NotNull @NotBlank
    private String email;
}
