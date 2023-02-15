package com.example.meeting.User.Dto;


import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SignInDto {

    private String user_email;

    private String user_name;
}
