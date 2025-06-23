package com.tasks.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticateDto {

    private String firstName;

    private String lastName;

    private String email;

}
