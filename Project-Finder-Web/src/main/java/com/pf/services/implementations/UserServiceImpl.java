package com.pf.services.implementations;

import com.pf.entities.models.User;
import com.pf.entities.repositories.UserRepository;
import com.pf.services.interfaces.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;


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

    @Override
    public User FindById(long id) throws Exception {
        Optional<User> user =  this.userRepository.findById(id);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User Not Found");
        }
    }

}
