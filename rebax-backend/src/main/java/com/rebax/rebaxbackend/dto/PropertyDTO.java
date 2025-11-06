package com.rebax.rebaxbackend.dto;


import com.rebax.rebaxbackend.enums.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.*;

@Data
public class PropertyDTO {
    @NotBlank String title;
    @NotBlank String description;
    @NotNull PropertyType type;
    @NotNull Purpose purpose;
    @NotNull @Positive Integer bedrooms;
    @NotNull @Positive Integer bathrooms;
    @NotNull @Positive Integer areaSqft;
    @NotNull @Positive BigDecimal price;
    @NotBlank String address;
    @NotBlank String city;
    @NotBlank String state;
    @Size(max = 1000) String mapLink;
    @NotNull List<String> amenities = List.of();
    @NotNull List<String> images = List.of();
}