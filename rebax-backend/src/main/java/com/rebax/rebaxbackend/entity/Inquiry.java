package com.rebax.rebaxbackend.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Inquiry {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne User buyer;
    @ManyToOne User broker;
    @ManyToOne Property property;

    String message;
    String reply;

    Instant createdAt;
    Instant repliedAt;
}
