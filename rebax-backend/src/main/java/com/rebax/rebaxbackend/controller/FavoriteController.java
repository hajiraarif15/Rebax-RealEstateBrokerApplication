package com.rebax.rebaxbackend.controller;


import com.rebax.rebaxbackend.entity.Favorite;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService svc;

    @PostMapping("/{id}")
    public Favorite add(@PathVariable Long id, @AuthenticationPrincipal User u){
        return svc.add(id, u);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id, @AuthenticationPrincipal User u){
        svc.remove(id, u);
    }

    @GetMapping("/me")
    public List<Favorite> my(@AuthenticationPrincipal User u){
        return svc.get(u);
    }
}

