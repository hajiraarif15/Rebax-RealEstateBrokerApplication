package com.rebax.rebaxbackend.repository;

import com.rebax.rebaxbackend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByBuyerId(Long buyerId);
    Optional<Favorite> findByBuyerIdAndPropertyId(Long buyerId, Long propertyId);

    int countByPropertyBrokerId(Long brokerId);  // ✅ Total favorites on broker's properties

    int countByPropertyBrokerIdAndProperty_City(Long brokerId, String city); // ✅ Favorites by city

}
