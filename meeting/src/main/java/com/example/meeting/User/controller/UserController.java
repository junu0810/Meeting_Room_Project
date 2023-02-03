package com.example.meeting.User.controller;


import com.example.meeting.User.controller.Dto.MainHomeDto;
import com.example.meeting.User.service.Dto.UserDto;
import com.example.meeting.User.service.UserService;
import com.example.meeting.common.ResponseResult;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

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
        String savedUserEmail = userService.createUser(userDto);
        return ResponseEntity.ok().body(new ResponseResult<>(HttpStatus.OK.value() , savedUserEmail));
   }

}
