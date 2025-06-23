package com.tasks.controllers;


import com.tasks.dto.UserDto;
import com.tasks.dto.UserLoginDto;
import com.tasks.dto.UserResponseDto;
import com.tasks.services.User.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/auth/")
@Slf4j
@RequiredArgsConstructor
public class UserController {


    public final UserService userService;

    @PostMapping("register")
    public ResponseEntity<UserResponseDto> SignUp(@Valid @RequestBody UserDto userDto) {
        String token = userService.SignUp(userDto);

        return ResponseEntity.ok(UserResponseDto.builder().message("User Signed Up successfully")
                .statusCode(HttpStatus.OK)
                .timestamp(Date.from(Instant.now()))
                .token(token)
                .build());
    }

    @PostMapping("login")
    public ResponseEntity<UserResponseDto> SignIn(@Valid @RequestBody UserLoginDto userLoginDto) {

        String token = userService.SignIn(userLoginDto);

        return ResponseEntity.ok(UserResponseDto.builder().message("User Signed In successfully")
                .statusCode(HttpStatus.OK)
                .timestamp(Date.from(Instant.now()))
                .token(token)
                .build());
    }

    @GetMapping("authenticate")
    public ResponseEntity<Map<String, ?>> isAuthenticated(@RequestHeader("Authorization") String authHeader) {

        userService.isAuthenticated(authHeader);
        return ResponseEntity.ok(Map.of("message", "Token is valid", "status", 200));
    }

}
