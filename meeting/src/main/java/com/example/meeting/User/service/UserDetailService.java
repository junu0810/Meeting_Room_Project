package com.example.meeting.User.service;

import com.example.meeting.User.controller.Dto.SignInDto;
import com.example.meeting.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService  implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        com.example.meeting.User.domain.User user = userRepository.findUserByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        return createUserDetails(user);
        
    }

    private UserDetails createUserDetails(com.example.meeting.User.domain.User user) {
        return User.builder()
                .username(user.getUser_name())
                .password(passwordEncoder.encode(use))
                .roles(user.getRoles().toArray(new String[0]))
                .build();
    }

}
