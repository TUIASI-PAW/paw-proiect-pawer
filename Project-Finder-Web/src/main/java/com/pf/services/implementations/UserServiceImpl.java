package com.pf.services.implementations;

import com.pf.entities.models.User;
import com.pf.entities.repositories.UserRepository;
import com.pf.services.interfaces.UserService;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void Save(User user) { userRepository.save(user); }

    @Override
    public Boolean ExistsByUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }

    @Override
    public Boolean ExistsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

}
