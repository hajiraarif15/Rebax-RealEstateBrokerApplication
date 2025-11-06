package com.rebax.rebaxbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CityStatDTO {
    private String city;
    private Long count;      // listings count
    private Integer favorites; // favorites count
}
