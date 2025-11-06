package com.rebax.rebaxbackend.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"buyer_id","property_id"}))
public class Favorite {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @ManyToOne User buyer;
    @ManyToOne Property property;
}
