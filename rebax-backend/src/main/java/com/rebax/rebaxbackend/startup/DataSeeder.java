package com.rebax.rebaxbackend.startup;

import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.PropertyImage;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.enums.PropertyType;
import com.rebax.rebaxbackend.enums.Purpose;
import com.rebax.rebaxbackend.enums.Role;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import com.rebax.rebaxbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed ONLY if no users present
        if (userRepository.count() > 0) return;

        // Seed Broker
        User broker = userRepository.save(User.builder()
                .name("Broker")
                .email("broker@rebax.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.BROKER)
                .build());

        // Seed Buyer
        userRepository.save(User.builder()
                .name("Buyer")
                .email("buyer@rebax.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.BUYER)
                .build());

        System.out.println("✅ Seeded users: broker@rebax.com / buyer@rebax.com (password: password)");

        // Seed Sample Properties for the broker
        seedSampleProperties(broker);
        System.out.println("✅ Seeded sample properties for demonstration");
    }

    private void seedSampleProperties(User broker) {
        // Property 1: Luxury Apartment
        Property prop1 = Property.builder()
                .title("2BHK Luxury Apartment - Whitefield")
                .description("Modern 2BHK apartment in gated society near IT park. Features include clubhouse, swimming pool, gym, and 24x7 security. Perfect for IT professionals seeking luxury and convenience.")
                .type(PropertyType.APARTMENT)
                .purpose(Purpose.SALE)
                .bedrooms(2)
                .bathrooms(2)
                .areaSqft(1200)
                .price(new BigDecimal("7500000"))
                .address("Whitefield Main Road")
                .city("Bangalore")
                .state("Karnataka")
                .mapLink("https://www.google.com/maps?q=Whitefield+Bangalore")
                .amenities(List.of("Swimming Pool", "Gym", "Clubhouse", "Security", "Parking"))
                .broker(broker)
                .build();

        PropertyImage img1 = PropertyImage.builder()
                .url("https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600")
                .property(prop1)
                .build();
        prop1.setImages(List.of(img1));
        propertyRepository.save(prop1);

        // Property 2: Villa for Rent
        Property prop2 = Property.builder()
                .title("4BHK Independent Villa - Koramangala")
                .description("Spacious 4BHK independent villa with garden and parking. Located in prime Koramangala area with easy access to restaurants, shopping, and business districts.")
                .type(PropertyType.VILLA)
                .purpose(Purpose.RENT)
                .bedrooms(4)
                .bathrooms(3)
                .areaSqft(2500)
                .price(new BigDecimal("85000"))
                .address("5th Block, Koramangala")
                .city("Bangalore")
                .state("Karnataka")
                .mapLink("https://www.google.com/maps?q=Koramangala+Bangalore")
                .amenities(List.of("Garden", "Parking", "Independent", "Prime Location"))
                .broker(broker)
                .build();

        PropertyImage img2 = PropertyImage.builder()
                .url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600")
                .property(prop2)
                .build();
        prop2.setImages(List.of(img2));
        propertyRepository.save(prop2);

        // Property 3: Studio Apartment
        Property prop3 = Property.builder()
                .title("Modern Studio Apartment - MG Road")
                .description("Compact and modern studio apartment in the heart of MG Road. Fully furnished with modern amenities, high-speed internet, and excellent connectivity to all parts of the city.")
                .type(PropertyType.STUDIO)
                .purpose(Purpose.RENT)
                .bedrooms(1)
                .bathrooms(1)
                .areaSqft(800)
                .price(new BigDecimal("35000"))
                .address("MG Road")
                .city("Bangalore")
                .state("Karnataka")
                .mapLink("https://www.google.com/maps?q=MG+Road+Bangalore")
                .amenities(List.of("Furnished", "High Speed Internet", "AC", "Elevator", "Prime Location"))
                .broker(broker)
                .build();

        PropertyImage img3 = PropertyImage.builder()
                .url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600")
                .property(prop3)
                .build();
        prop3.setImages(List.of(img3));
        propertyRepository.save(prop3);

        // Property 4: Affordable Townhouse
        Property prop4 = Property.builder()
                .title("3BHK Townhouse - Electronic City")
                .description("Affordable 3BHK townhouse in Electronic City phase 2. Good for small families with nearby schools, hospitals, and shopping complexes. Easy access to IT companies.")
                .type(PropertyType.TOWNHOUSE)
                .purpose(Purpose.SALE)
                .bedrooms(3)
                .bathrooms(2)
                .areaSqft(1500)
                .price(new BigDecimal("4200000"))
                .address("Electronic City Phase 2")
                .city("Bangalore")
                .state("Karnataka")
                .mapLink("https://www.google.com/maps?q=Electronic+City+Bangalore")
                .amenities(List.of("Near IT Companies", "Schools Nearby", "Shopping Complex", "Hospital"))
                .broker(broker)
                .build();

        PropertyImage img4 = PropertyImage.builder()
                .url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1600")
                .property(prop4)
                .build();
        prop4.setImages(List.of(img4));
        propertyRepository.save(prop4);

        // Property 5: Luxury Penthouse
        Property prop5 = Property.builder()
                .title("Luxury Penthouse - UB City Mall")
                .description("Ultra-luxury penthouse with panoramic city views. Premium location near UB City Mall with world-class amenities, rooftop access, and concierge services.")
                .type(PropertyType.APARTMENT)
                .purpose(Purpose.SALE)
                .bedrooms(4)
                .bathrooms(4)
                .areaSqft(3500)
                .price(new BigDecimal("25000000"))
                .address("UB City Mall Area")
                .city("Bangalore")
                .state("Karnataka")
                .mapLink("https://www.google.com/maps?q=UB+City+Mall+Bangalore")
                .amenities(List.of("City Views", "Rooftop Access", "Concierge", "Premium Location", "Ultra Luxury"))
                .broker(broker)
                .build();

        PropertyImage img5 = PropertyImage.builder()
                .url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600")
                .property(prop5)
                .build();
        prop5.setImages(List.of(img5));
        propertyRepository.save(prop5);
    }
}
