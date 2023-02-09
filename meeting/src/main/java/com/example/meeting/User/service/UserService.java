package com.example.meeting.User.service;


import com.example.meeting.User.controller.Dto.SignInDto;
import com.example.meeting.User.domain.User;
import com.example.meeting.User.repository.UserRepository;
import com.example.meeting.User.controller.Dto.UserDto;
import com.example.meeting.common.Jwt.Dto.TokenDto;
import com.example.meeting.common.Jwt.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    @Transactional
    public String createUser(UserDto userData) {

        User user = userRepository.findUserByUserEmail(userData.getUser_email())
                .orElseGet(() -> userRepository.save(User.createUser(userData)));

        return user.getUserEmail();
    }


    @Transactional
    public TokenDto findUser(String userEmail, String username) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, username);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtProvider.createToken(authentication);
    }

}
