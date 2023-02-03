package com.example.meeting.User.domain;

import com.example.meeting.Document.domain.Document;
import com.example.meeting.Room.domain.Room;
import com.example.meeting.User.service.Dto.UserDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_email")
    private String email;

    @Column(name = "userName")
    private String user_name;

    @Builder.Default
    @Column(name = "role")
    @Enumerated(EnumType.ORDINAL)
    private Role role = Role.USER ;

    @Builder.Default
    @OneToMany(mappedBy = "user" ,cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Document> documentList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL  , orphanRemoval = true)
    private List<Room> roomList = new ArrayList<>();

    public static User createUser(UserDto newUserDto) {
        return User.builder()
                .email(newUserDto.getUser_email())
                .user_name(newUserDto.getUser_name())
                .role(newUserDto.getRole())
                .build();
    }

}
