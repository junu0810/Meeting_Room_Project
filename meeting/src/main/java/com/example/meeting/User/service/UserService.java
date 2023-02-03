package com.example.meeting.User.service;


import com.example.meeting.User.domain.User;
import com.example.meeting.User.repository.UserRepository;
import com.example.meeting.User.service.Dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public String createUser(UserDto userData) {

        User user = userRepository.findUserByEmail(userData.getUser_email())
                .orElseGet(() -> userRepository.save(User.createUser(userData)));

        return user.getEmail();
    }

}
