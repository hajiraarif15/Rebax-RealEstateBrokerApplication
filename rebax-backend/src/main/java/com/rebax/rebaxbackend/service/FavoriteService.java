package com.rebax.rebaxbackend.service;

import com.rebax.rebaxbackend.entity.Favorite;
import com.rebax.rebaxbackend.entity.User;
import java.util.*;

public interface FavoriteService {
    Favorite add(Long propertyId, User user);
    void remove(Long propertyId, User user);
    List<Favorite> get(User user);
}
