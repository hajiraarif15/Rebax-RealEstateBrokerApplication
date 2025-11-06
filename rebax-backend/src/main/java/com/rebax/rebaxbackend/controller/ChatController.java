package com.rebax.rebaxbackend.controller;

import com.rebax.rebaxbackend.entity.ChatMessage;
import com.rebax.rebaxbackend.entity.Inquiry;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.repository.ChatMessageRepository;
import com.rebax.rebaxbackend.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final InquiryRepository inquiryRepository;

    @GetMapping("/inquiry/{inquiryId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long inquiryId, 
                                                          @AuthenticationPrincipal User user) {
        // Verify user has access to this inquiry
        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElse(null);
        if (inquiry == null || (!inquiry.getBuyer().getId().equals(user.getId()) && 
                               !inquiry.getBroker().getId().equals(user.getId()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<ChatMessage> messages = chatMessageRepository.findByInquiryIdOrderBySentAtAsc(inquiryId);
        
        // Mark messages as read for the current user
        messages.stream()
                .filter(msg -> msg.getReceiver().getId().equals(user.getId()) && !msg.isRead())
                .forEach(msg -> {
                    msg.setRead(true);
                    chatMessageRepository.save(msg);
                });

        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody Map<String, Object> request, 
                                                 @AuthenticationPrincipal User sender) {
        Long inquiryId = Long.valueOf(request.get("inquiryId").toString());
        String message = request.get("message").toString();

        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElse(null);
        if (inquiry == null || (!inquiry.getBuyer().getId().equals(sender.getId()) && 
                               !inquiry.getBroker().getId().equals(sender.getId()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Determine receiver
        User receiver = inquiry.getBuyer().getId().equals(sender.getId()) ? 
                       inquiry.getBroker() : inquiry.getBuyer();

        ChatMessage chatMessage = ChatMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .property(inquiry.getProperty())
                .inquiry(inquiry)
                .message(message)
                .build();

        ChatMessage saved = chatMessageRepository.save(chatMessage);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@AuthenticationPrincipal User user) {
        Long unreadCount = chatMessageRepository.countUnreadMessages(user.getId());
        return ResponseEntity.ok(Map.of("unreadCount", unreadCount));
    }

    @PutMapping("/mark-read/{messageId}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long messageId, 
                                         @AuthenticationPrincipal User user) {
        ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);
        if (message != null && message.getReceiver().getId().equals(user.getId())) {
            message.setRead(true);
            chatMessageRepository.save(message);
        }
        return ResponseEntity.ok().build();
    }
}