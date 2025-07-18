package com.KrishiMitra.KrishiMitra.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "diseases")
public class DiseasesModel {

    @JsonProperty("class_name")
    @Id
    @NotNull(message = "Class name cannot be null")
    @NotBlank(message = "Class name cannot be blank")
    @Size(min = 1, message = "Class name must have at least 1 character")
    private String className;

    @JsonProperty("kannada_name")
    @NotBlank(message = "Kannada name cannot be blank")
    @Size(max = 255, message = "Kannada name must be less than 255 characters")
    private String kannadaName;

    @JsonProperty("description")
    @NotBlank(message = "Description cannot be blank")
    private String description;

    @JsonProperty("kannada_description")
    @NotBlank(message = "Kannada description cannot be blank")
    private String kannadaDescription;

    @JsonProperty("cause")
    @NotBlank(message = "Cause cannot be blank")
    private String cause;

    @JsonProperty("kannada_cause")
    @NotBlank(message = "Kannada cause cannot be blank")
    private String kannadaCause;

    @JsonProperty("recommended_actions")
    @NotNull(message = "Recommended actions cannot be null")
    private List<ActionDTO> recommendedActions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActionDTO {

        @JsonProperty("action")
        @NotBlank(message = "Action cannot be blank")
        @Size(min = 1, message = "Action must have at least 1 character")
        private String action;

        @JsonProperty("kannada_action")
        @NotBlank(message = "Kannada action cannot be blank")
        @Size(min = 1, message = "Kannada action must have at least 1 character")
        private String kannadaAction;
    }
}
