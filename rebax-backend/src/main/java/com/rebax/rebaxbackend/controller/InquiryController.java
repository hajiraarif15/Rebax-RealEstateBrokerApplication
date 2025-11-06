package com.rebax.rebaxbackend.controller;


import com.rebax.rebaxbackend.dto.InquiryDTO;
import com.rebax.rebaxbackend.entity.Inquiry;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService svc;

    @PostMapping
    public Inquiry send(@AuthenticationPrincipal User u, @RequestBody InquiryDTO d){
        return svc.send(u, d);
    }

    @GetMapping("/me")
    public List<Inquiry> my(@AuthenticationPrincipal User u){
        return svc.getUserInquiries(u);
    }

    @PostMapping("/{id}/reply")
    public Inquiry reply(@PathVariable Long id, @AuthenticationPrincipal User u, @RequestBody String msg){
        return svc.reply(id, msg, u);
    }
}

