package com.pf.services.interfaces;

import com.pf.entities.models.User;

import java.util.Optional;

public interface UserService {
    void Save(User user);

    Boolean ExistsByUsername(String username);

    Boolean ExistsByEmail(String email);

    User FindById(long id) throws Exception;
}
