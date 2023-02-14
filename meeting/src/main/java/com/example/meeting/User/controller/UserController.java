package com.example.meeting.User.controller;


import com.example.meeting.User.controller.Dto.MainHomeDto;
import com.example.meeting.User.controller.Dto.SignInDto;
import com.example.meeting.User.controller.Dto.UserDto;
import com.example.meeting.User.service.UserService;

import com.example.meeting.common.Jwt.Dto.TokenDto;
import com.example.meeting.common.Jwt.JwtProvider;
import com.example.meeting.common.Jwt.JwtString;
import com.example.meeting.common.ResponseResult;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.meeting.User.domain.User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final JwtProvider jwtProvider;

    @PostMapping("/sign")
    public ResponseEntity<ResponseResult<MainHomeDto>> SignIn(){
        // userEmail을 통한 권한 확인

        // 응시자일 경우 UserDto 데이터 응답

        // interviewer
        MainHomeDto result = new MainHomeDto();
        return ResponseEntity.ok().body(new ResponseResult<>(HttpStatus.OK.value(), result));
    }

    @Transactional
    @PostMapping("/made")
    public ResponseEntity<ResponseResult<String>> SignUp(@RequestBody UserDto userDto){
        String savedUser = userService.createUser(userDto);
        return ResponseEntity.ok()
                .body(new ResponseResult<>(HttpStatus.OK.value() , savedUser));
   }
   @PostMapping("/signin")
    public ResponseEntity<ResponseResult<TokenDto>> getToken(@RequestBody SignInDto signinDto){
       TokenDto tokenDto = userService.findUser(signinDto.getUser_email() , signinDto.getUser_name());
       return ResponseEntity.ok()
               .body(new ResponseResult<>(HttpStatus.OK.value() , tokenDto));
   }

   @GetMapping("/test")
   public ResponseEntity<ResponseResult<String>> TestTokenController(@RequestBody SignInDto signInDto){
       return ResponseEntity.ok()
               .body(new ResponseResult<>(HttpStatus.OK.value() , "완료"));
   }

}
