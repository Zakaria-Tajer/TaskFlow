package com.tasks.dto;

import com.tasks.enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {


    private String firstName;


    private String lastName;


    private String email;


    private String password;

    private String image;
    @Enumerated(EnumType.STRING)
    private Roles roles;


}
