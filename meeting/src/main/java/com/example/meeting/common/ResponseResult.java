package com.example.meeting.common;


import lombok.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ResponseResult<ele> {

    private int code;

    private ele result;

}
