package com.rebax.rebaxbackend.controller;

import com.rebax.rebaxbackend.dto.PropertyDTO;
import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.enums.Role;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import com.rebax.rebaxbackend.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService svc;
    private final PropertyRepository repo;

    @PostMapping
    public Property create(@AuthenticationPrincipal User u, @Valid @RequestBody PropertyDTO d) {
        System.out.println("Creating new property request");
        if (u == null) throw new RuntimeException("Unauthorized: Please log in.");
        if (u.getRole() != Role.BROKER) throw new RuntimeException("Only brokers can add properties.");

        System.out.println("Broker creating property: " + u.getEmail() + " (ID: " + u.getId() + ")");
        System.out.println("Property data: " + d.getTitle() + " in " + d.getCity() + ", " + d.getState());
        
        Property created = svc.create(d, u);
        System.out.println("Property created with ID: " + created.getId() + " for broker ID: " + created.getBroker().getId());
        
        return created;
    }

    @GetMapping
    public List<Property> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String purpose,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        return svc.search(city, type, purpose, minPrice, maxPrice);
    }

    @GetMapping("/{id}")
    public Property getProperty(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable Long id, @Valid @RequestBody PropertyDTO d, @AuthenticationPrincipal User u) {
        System.out.println("🔧 Updating property request for ID: " + id);
        if (u == null) return ResponseEntity.status(401).body("Unauthorized");
        if (u.getRole() != Role.BROKER)
            return ResponseEntity.status(403).body("Only brokers can update properties");

        Property property = repo.findById(id).orElse(null);
        if (property == null) return ResponseEntity.notFound().build();

        if (!property.getBroker().getId().equals(u.getId()))
            return ResponseEntity.status(403).body("You can only update your own listings.");

        System.out.println("Broker updating property: " + u.getEmail() + " (ID: " + u.getId() + ")");
        System.out.println("Updated property data: " + d.getTitle() + " in " + d.getCity() + ", " + d.getState());
        
        Property updated = svc.update(id, d, u);
        System.out.println("Property updated with ID: " + updated.getId());
        
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, @AuthenticationPrincipal User u) {
        if (u == null) return ResponseEntity.status(401).body("Unauthorized");
        if (u.getRole() != Role.BROKER)
            return ResponseEntity.status(403).body("Only brokers can delete properties");

        Property property = repo.findById(id).orElse(null);
        if (property == null) return ResponseEntity.notFound().build();

        if (!property.getBroker().getId().equals(u.getId()))
            return ResponseEntity.status(403).body("You can only delete your own listings.");

        repo.delete(property);
        return ResponseEntity.ok("Property deleted successfully");
    }

    @GetMapping("/my")
    public List<Property> myListings(@AuthenticationPrincipal User u) {
        System.out.println("Incoming /api/properties/my request");
        if (u == null) {
            System.out.println("No authenticated user found");
            throw new RuntimeException("Unauthorized");
        }
        System.out.println("Authenticated broker: " + u.getEmail() + " (ID: " + u.getId() + ", Role: " + u.getRole() + ")");
        if (u.getRole() != Role.BROKER)
            throw new RuntimeException("Only brokers can access their listings");

        List<Property> props = svc.findByBroker(u);
        System.out.println(" Found " + props.size() + " properties for broker ID: " + u.getId());
        
        for (Property p : props) {
            System.out.println("  - Property: " + p.getTitle() + " (ID: " + p.getId() + ", Broker ID: " + (p.getBroker() != null ? p.getBroker().getId() : "null") + ")");
        }
        
        return props;
    }

}
