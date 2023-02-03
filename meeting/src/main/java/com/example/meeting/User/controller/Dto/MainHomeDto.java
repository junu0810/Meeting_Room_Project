package com.example.meeting.User.controller.Dto;

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
