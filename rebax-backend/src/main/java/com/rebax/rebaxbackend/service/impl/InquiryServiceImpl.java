package com.rebax.rebaxbackend.service.impl;

import com.rebax.rebaxbackend.dto.InquiryDTO;
import com.rebax.rebaxbackend.entity.ChatMessage;
import com.rebax.rebaxbackend.entity.Inquiry;
import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.enums.Role;
import com.rebax.rebaxbackend.repository.ChatMessageRepository;
import com.rebax.rebaxbackend.repository.InquiryRepository;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import com.rebax.rebaxbackend.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository repo;
    private final PropertyRepository prepo;
    private final ChatMessageRepository chatRepo;

    @Override
    public Inquiry send(User buyer, InquiryDTO d) {
        Property p = prepo.findById(d.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Inquiry inquiry = Inquiry.builder()
                .buyer(buyer)
                .broker(p.getBroker())
                .property(p)
                .message(d.getMessage())
                .createdAt(Instant.now())
                .build();

        Inquiry savedInquiry = repo.save(inquiry);

        // Create initial chat message
        ChatMessage initialMessage = ChatMessage.builder()
                .sender(buyer)
                .receiver(p.getBroker())
                .property(p)
                .inquiry(savedInquiry)
                .message(d.getMessage())
                .build();
        
        chatRepo.save(initialMessage);

        return savedInquiry;
    }

    @Override
    public List<Inquiry> getUserInquiries(User u) {
        if (u.getRole() == Role.BROKER) {
            return repo.findByBrokerIdOrderByCreatedAtDesc(u.getId());
        } else {
            return repo.findByBuyerIdOrderByCreatedAtDesc(u.getId());
        }
    }

    @Override
    public Inquiry reply(Long id, String msg, User b) {
        Inquiry inq = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        if (!inq.getBroker().getId().equals(b.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        inq.setReply(msg);
        inq.setRepliedAt(Instant.now());

        Inquiry savedInquiry = repo.save(inq);

        // Create chat message for the reply
        ChatMessage replyMessage = ChatMessage.builder()
                .sender(b)
                .receiver(inq.getBuyer())
                .property(inq.getProperty())
                .inquiry(inq)
                .message(msg)
                .build();
        
        chatRepo.save(replyMessage);

        return savedInquiry;
    }
}
