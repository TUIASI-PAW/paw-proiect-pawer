package com.pf.services.interfaces;

import com.pf.entities.models.User;

public interface UserService {
    void Save(User user);

    Boolean ExistsByUsername(String username);

    Boolean ExistsByEmail(String email);
}
