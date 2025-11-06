package com.rebax.rebaxbackend.service.impl;

import com.rebax.rebaxbackend.dto.PropertyDTO;
import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.PropertyImage;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.enums.PropertyType;
import com.rebax.rebaxbackend.enums.Purpose;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import com.rebax.rebaxbackend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository repo;

    @Override
    public Property create(PropertyDTO d, User broker) {
        Property p = new Property();
        p.setTitle(d.getTitle());
        p.setDescription(d.getDescription());
        p.setType(d.getType());
        p.setPurpose(d.getPurpose());
        p.setBedrooms(d.getBedrooms());
        p.setBathrooms(d.getBathrooms());
        p.setAreaSqft(d.getAreaSqft());
        p.setPrice(d.getPrice());
        p.setAddress(d.getAddress());
        p.setCity(d.getCity());
        p.setState(d.getState());
        p.setMapLink(d.getMapLink());
        p.setAmenities(d.getAmenities());
        p.setBroker(broker);

        if (d.getImages() != null && !d.getImages().isEmpty()) {
            List<PropertyImage> imgs = d.getImages().stream()
                    .map(url -> PropertyImage.builder().url(url).property(p).build())
                    .toList();
            p.setImages(imgs);
        }

        return repo.save(p);
    }

    @Override
    public List<Property> search(String city, String type, String purpose, BigDecimal minPrice, BigDecimal maxPrice) {
        PropertyType propertyType = null;
        Purpose purposeEnum = null;
        
        if (type != null && !type.isEmpty()) {
            try {
                propertyType = PropertyType.valueOf(type.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Invalid type, ignore
            }
        }
        
        if (purpose != null && !purpose.isEmpty()) {
            try {
                purposeEnum = Purpose.valueOf(purpose.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Invalid purpose, ignore
            }
        }
        
        return repo.search(city, propertyType, purposeEnum, minPrice, maxPrice);
    }

    @Override
    public Property update(Long id, PropertyDTO d, User broker) {
        Property p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        
        // Update fields
        p.setTitle(d.getTitle());
        p.setDescription(d.getDescription());
        p.setType(d.getType());
        p.setPurpose(d.getPurpose());
        p.setBedrooms(d.getBedrooms());
        p.setBathrooms(d.getBathrooms());
        p.setAreaSqft(d.getAreaSqft());
        p.setPrice(d.getPrice());
        p.setAddress(d.getAddress());
        p.setCity(d.getCity());
        p.setState(d.getState());
        p.setMapLink(d.getMapLink());
        p.setAmenities(d.getAmenities());

        // Update images if provided
        if (d.getImages() != null) {
            // Clear existing images
            p.getImages().clear();
            
            // Add new images
            if (!d.getImages().isEmpty()) {
                List<PropertyImage> imgs = d.getImages().stream()
                        .map(url -> PropertyImage.builder().url(url).property(p).build())
                        .toList();
                p.setImages(imgs);
            }
        }

        return repo.save(p);
    }

    @Override
    public List<Property> findByBroker(User broker) {
        return repo.findByBrokerIdOrderByIdDesc(broker.getId());
    }
}
