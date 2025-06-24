package com.tasks.mappers;


import com.tasks.dto.UserDto;
import com.tasks.models.User;

public class UserMapper {

    public static User toEntity(UserDto dto) {
        return User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .roles(dto.getRoles())
                .build();
    }


    public static UserDto toDto(User user) {
        return UserDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .roles(user.getRoles())
                .build();
    }



}
