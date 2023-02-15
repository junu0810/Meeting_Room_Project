package com.example.meeting.User.Dto;

import com.example.meeting.User.domain.Role;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MainHomeDto {
    private String username;

    private Role role;

    private List<RoomListDto> roomList;

}
