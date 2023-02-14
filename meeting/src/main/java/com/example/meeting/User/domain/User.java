package com.example.meeting.User.domain;

import com.example.meeting.Document.domain.Document;
import com.example.meeting.Room.domain.Room;
import com.example.meeting.User.controller.Dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User  implements UserDetails {

    @Id
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_name")
    private String userName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role" , nullable = false )
    private Role role;

    @Builder.Default
    @OneToMany(mappedBy = "user" ,cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Document> documentList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL  , orphanRemoval = true)
    private List<Room> roomList = new ArrayList<>();

    public static User createUser(UserDto newUserDto) {
        return User.builder()
                .userEmail(newUserDto.getUser_email())
                .userName(newUserDto.getUser_name())
                .role(newUserDto.getRole())
                .build();
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return userName;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
