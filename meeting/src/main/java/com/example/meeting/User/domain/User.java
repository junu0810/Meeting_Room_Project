package com.example.meeting.User.domain;

import com.example.meeting.Document.domain.Document;
import com.example.meeting.Room.domain.Room;
import com.example.meeting.User.Dto.UserDto;
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

}
