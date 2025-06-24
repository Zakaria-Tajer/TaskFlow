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

    @NotBlank(message = "First name is required")
    @Size(max = 100, min = 3, message = "First name must be between 3 and 100 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, min = 3, message = "Last name must be between 3 and 100 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    @Enumerated(EnumType.STRING)
    private Roles roles;


}
