package com.rebax.rebaxbackend.repository;

import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.enums.PropertyType;
import com.rebax.rebaxbackend.enums.Purpose;
import org.springframework.data.jpa.repository.*;
import java.math.BigDecimal;
import java.util.*;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query(
            "select p from Property p " +
                    "where (:city is null or lower(p.city) like lower(concat('%', :city, '%'))) " +
                    "and (:type is null or p.type = :type) " +
                    "and (:purpose is null or p.purpose = :purpose) " +
                    "and (:minPrice is null or p.price >= :minPrice) " +
                    "and (:maxPrice is null or p.price <= :maxPrice) " +
                    "order by p.id desc"
    )
    List<Property> search(String city, PropertyType type, Purpose purpose, BigDecimal minPrice, BigDecimal maxPrice);

    List<Property> findByBrokerIdOrderByIdDesc(Long brokerId);
}
