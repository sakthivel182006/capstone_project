package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

        @PostMapping("/login")
        public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        return userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        }


        @GetMapping("/validate")
public String validateToken(@RequestParam String token) {

    boolean isValid = userService.validateToken(token);

    if (!isValid) {
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid or expired token"
        );
    }

    return "Token is valid";
}

}