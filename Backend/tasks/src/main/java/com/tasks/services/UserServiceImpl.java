package com.tasks.services;

import com.tasks.dto.UserDto;
import com.tasks.dto.UserLoginDto;
import com.tasks.exceptions.FunctionalException;
import com.tasks.mappers.UserMapper;
import com.tasks.models.User;
import com.tasks.repository.UserRepository;
import com.tasks.security.ApplicationConfig;
import com.tasks.services.User.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {


    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ApplicationConfig applicationConfig;
    private final AuthenticationManager authenticationManager;


    @Override
    public String SignUp(UserDto userDto) {
        Optional<User> userExist = userRepository.findUserByEmail(userDto.getEmail());


        if (userExist.isPresent()) {
            throw new FunctionalException("ERR_EMAIL_USED", HttpStatus.BAD_REQUEST);
        }

        String rawPassword = userDto.getPassword();


        userDto.setPassword(applicationConfig.passwordEncoder().encode(userDto.getPassword()));

        User user = UserMapper.toEntity(userDto);
        User userSaved = userRepository.save(user);

        return authenticateUser(userSaved.getEmail(), rawPassword);
    }

    @Override
    public String SignIn(UserLoginDto loginDto) {
        User user = getUserByEmail(loginDto.getEmail());


        if (!applicationConfig.passwordEncoder().matches(loginDto.getPassword(), user.getPassword())) {
            log.info("Passwords do not match");
            throw new FunctionalException("ERR_PASSWORDS_DONT_MATCH", HttpStatus.BAD_REQUEST);
        }

        return authenticateUser(loginDto.getEmail(), loginDto.getPassword());

    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new FunctionalException("USER_NOT_FOUND", HttpStatus.NOT_FOUND));
    }

    @Override
    public Boolean isAuthenticated(String token) {

        try {

        Claims claims = jwtService.extractAllClaims(token);
        User user = getUserByEmail(claims.getSubject());

        log.info("Checking if token is valid");
        return jwtService.isTokenValid(token, user);

        } catch (JwtException exception) {
            throw new FunctionalException("ERR_INVALID_TOKEN", HttpStatus.BAD_REQUEST);
        }

    }


    private String authenticateUser(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            password
                    )
            );

            User authenticatedUser = (User) authentication.getPrincipal();
            String Token = jwtService.generateToken(authenticatedUser);

            log.info("user {} logged", authenticatedUser.getEmail());

            return Token;

        } catch (AuthenticationException ex) {

            throw new FunctionalException("ERR_INVALID_CRED", HttpStatus.BAD_REQUEST);
        }
    }
}
