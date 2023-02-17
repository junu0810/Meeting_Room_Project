package com.example.meeting.User.service;


import com.example.meeting.User.Dto.SignInDto;
import com.example.meeting.User.domain.Role;
import com.example.meeting.User.domain.User;
import com.example.meeting.User.repository.UserRepository;
import com.example.meeting.User.Dto.UserDto;
import com.example.meeting.common.Jwt.Dto.TokenDto;
import com.example.meeting.common.Jwt.JwtProvider;
import com.example.meeting.common.Jwt.JwtString;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    @Transactional
    public String createUser(SignInDto signInDto) {

        User user = userRepository.findUserByUserEmailAndUserName(signInDto.getUser_email() , signInDto.getUser_name())
                .orElseGet(() -> userRepository.save(User.createUser(
                        UserDto.builder()
                                .user_email(signInDto.getUser_email())
                                .user_name(signInDto.getUser_name())
                                .role(Role.USER).build()
                )));

        return user.getUserEmail();
    }


    @Transactional
    public TokenDto invalidProvide(SignInDto signInDto) throws Exception {

        User user = userRepository.findUserByUserEmailAndUserName(signInDto.getUser_email() , signInDto.getUser_name())
                .orElseThrow(() -> new Exception("사용자를 찾을 수 없습니다."));

        return jwtProvider.createToken(user.getUserEmail());
    }

    public String findUser(String token) throws  Exception{
        return jwtProvider.getUserEmail(token);
    }

    public String resolveToken(String bearerToken) {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
