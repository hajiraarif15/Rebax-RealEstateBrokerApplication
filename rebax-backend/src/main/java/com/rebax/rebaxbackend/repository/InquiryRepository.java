package com.rebax.rebaxbackend.repository;

import com.rebax.rebaxbackend.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    List<Inquiry> findByBuyerIdOrderByCreatedAtDesc(Long buyerId);
    List<Inquiry> findByBrokerIdOrderByCreatedAtDesc(Long brokerId);

    int countByBrokerId(Long brokerId); 

}
