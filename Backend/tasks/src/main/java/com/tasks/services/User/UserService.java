package com.tasks.services.User;

import com.tasks.dto.UserDto;
import com.tasks.models.User;

public interface UserService {

    String SignUp(UserDto userDto);
    User getUserByEmail(String email);
}
