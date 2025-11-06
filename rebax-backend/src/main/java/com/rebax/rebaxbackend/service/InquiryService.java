package com.rebax.rebaxbackend.service;



import com.rebax.rebaxbackend.dto.InquiryDTO;
import com.rebax.rebaxbackend.entity.Inquiry;
import com.rebax.rebaxbackend.entity.User;
import java.util.List;

public interface InquiryService {
    Inquiry send(User buyer, InquiryDTO dto);
    List<Inquiry> getUserInquiries(User user);
    Inquiry reply(Long id, String msg, User broker);
}
