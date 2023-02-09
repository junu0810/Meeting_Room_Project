package com.example.meeting.common.Jwt.Dto;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
public class TokenDto {
    private String grantType;
    private String accessToken;
}