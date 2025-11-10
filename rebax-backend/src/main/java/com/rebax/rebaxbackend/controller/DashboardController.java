package com.rebax.rebaxbackend.controller;

import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.repository.FavoriteRepository;
import com.rebax.rebaxbackend.repository.InquiryRepository;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final PropertyRepository propertyRepo;
    private final InquiryRepository inquiryRepo;
    private final FavoriteRepository favoriteRepo;

    @GetMapping("/broker")
    public Map<String, Object> brokerDashboard(@AuthenticationPrincipal User broker) {

        List<Property> listings = propertyRepo.findByBrokerIdOrderByIdDesc(broker.getId());

        Map<String, Integer> cityCounts = listings.stream()
                .collect(Collectors.groupingBy(Property::getCity, Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)));

        Map<String, Integer> typeCounts = listings.stream()
                .collect(Collectors.groupingBy(p -> p.getType().toString(), Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)));

        Map<String, Integer> purposeCounts = listings.stream()
                .collect(Collectors.groupingBy(p -> p.getPurpose().toString(), Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)));

        double totalValue = listings.stream()
                .mapToDouble(p -> p.getPrice() != null ? p.getPrice().doubleValue() : 0.0)
                .sum();

        double avgPrice = listings.isEmpty() ? 0.0 : totalValue / listings.size();

        Map<String, Object> result = new HashMap<>();
        result.put("properties", listings.size());
        result.put("inquiries", inquiryRepo.countByBrokerId(broker.getId()));
        result.put("favorites", favoriteRepo.countByPropertyBrokerId(broker.getId()));
        result.put("cities", cityCounts);
        result.put("propertyTypes", typeCounts);
        result.put("purposes", purposeCounts);
        result.put("totalValue", totalValue);
        result.put("averagePrice", avgPrice);
        result.put("recentListings", listings.stream().limit(5).collect(Collectors.toList()));

        return result;
    }
}
