package com.rebax.rebaxbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class ChatMessage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonIgnoreProperties({"password", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
    User sender;

    @ManyToOne
    @JsonIgnoreProperties({"password", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
    User receiver;

    @ManyToOne
    @JsonIgnoreProperties({"broker", "images"})
    Property property;

    @ManyToOne
    Inquiry inquiry; // Link to the original inquiry

    @Column(length = 2000)
    String message;

    @Builder.Default
    Instant sentAt = Instant.now();

    @Builder.Default
    boolean isRead = false;
}