package com.tasks.services.User;

import com.tasks.dto.UserDto;
import com.tasks.dto.UserLoginDto;
import com.tasks.models.User;

public interface UserService {

    String SignUp(UserDto userDto);
    String SignIn(UserLoginDto loginDto);
    User getUserByEmail(String email);
}
