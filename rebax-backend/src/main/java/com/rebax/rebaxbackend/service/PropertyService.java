package com.rebax.rebaxbackend.service;



import com.rebax.rebaxbackend.dto.PropertyDTO;
import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.User;
import java.math.BigDecimal;
import java.util.*;

public interface PropertyService {
    Property create(PropertyDTO dto, User broker);
    Property update(Long id, PropertyDTO dto, User broker);
    List<Property> search(String city, String type, String purpose, BigDecimal min, BigDecimal max);
    List<Property> findByBroker(User broker);
}

