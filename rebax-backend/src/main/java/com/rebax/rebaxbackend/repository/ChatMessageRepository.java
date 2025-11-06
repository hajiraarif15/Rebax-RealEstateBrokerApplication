package com.rebax.rebaxbackend.repository;

import com.rebax.rebaxbackend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    List<ChatMessage> findByInquiryIdOrderBySentAtAsc(Long inquiryId);
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.inquiry.id = :inquiryId ORDER BY cm.sentAt ASC")
    List<ChatMessage> findChatHistory(@Param("inquiryId") Long inquiryId);
    
    @Query("SELECT COUNT(cm) FROM ChatMessage cm WHERE cm.receiver.id = :receiverId AND cm.isRead = false")
    Long countUnreadMessages(@Param("receiverId") Long receiverId);
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.receiver.id = :receiverId AND cm.isRead = false")
    List<ChatMessage> findUnreadMessages(@Param("receiverId") Long receiverId);
}