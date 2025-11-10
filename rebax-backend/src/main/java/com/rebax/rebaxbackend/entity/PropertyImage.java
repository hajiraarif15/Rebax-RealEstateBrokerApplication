package com.rebax.rebaxbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class PropertyImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 2000) 
    String url;

    @ManyToOne
    @JsonIgnore
    Property property;
}
