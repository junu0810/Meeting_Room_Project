package com.example.meeting.User.service;

import com.example.meeting.User.domain.Role;
import com.example.meeting.User.domain.User;
import com.example.meeting.User.repository.UserRepository;
import com.example.meeting.User.service.Dto.UserDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    UserServiceTest(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Test
    @Transactional
    void CreateUser() {
        UserDto newuserDto = UserDto.builder()
                .user_email("baek1008@naver")
                .user_name("joonWoo")
                .role(Role.USER)
                .build();
        User newUser = User.createUser(newuserDto);

        userRepository.save(newUser);
    }

}