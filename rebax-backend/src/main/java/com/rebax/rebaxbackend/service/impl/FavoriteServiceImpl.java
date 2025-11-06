package com.rebax.rebaxbackend.service.impl;

import com.rebax.rebaxbackend.entity.Favorite;
import com.rebax.rebaxbackend.entity.Property;
import com.rebax.rebaxbackend.entity.User;
import com.rebax.rebaxbackend.enums.Role;
import com.rebax.rebaxbackend.repository.FavoriteRepository;
import com.rebax.rebaxbackend.repository.PropertyRepository;
import com.rebax.rebaxbackend.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository freq;
    private final PropertyRepository prepo;

    @Override
    public Favorite add(Long id, User user) {
        if (user.getRole() != Role.BUYER) {
            throw new RuntimeException("Only buyers can add favorites");
        }

        Property property = prepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Favorite favorite = Favorite.builder()
                .buyer(user)
                .property(property)
                .build();

        return freq.save(favorite);
    }

    @Override
    public void remove(Long id, User user) {
        freq.findByBuyerIdAndPropertyId(user.getId(), id)
                .ifPresent(freq::delete);
    }

    @Override
    public java.util.List<Favorite> get(User user) {
        return freq.findByBuyerId(user.getId());
    }
}
