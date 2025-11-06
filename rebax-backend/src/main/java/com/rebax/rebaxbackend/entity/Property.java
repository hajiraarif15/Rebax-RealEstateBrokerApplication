package com.rebax.rebaxbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rebax.rebaxbackend.enums.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    @Column(length = 2000)
    String description;

    @Enumerated(EnumType.STRING)
    PropertyType type;

    @Enumerated(EnumType.STRING)
    Purpose purpose;

    Integer bedrooms;
    Integer bathrooms;
    Integer areaSqft;
    BigDecimal price;

    String address;
    String city;
    String state;

    @Column(length = 1000)
    String mapLink;

    @ElementCollection
    List<String> amenities;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("property")
    List<PropertyImage> images;

    @ManyToOne
    @JsonIgnoreProperties({"properties", "password", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
    User broker;
}
