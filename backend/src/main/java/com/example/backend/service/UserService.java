package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.UserDTO;
import com.example.backend.enums.UserRole;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ✅ REGISTER
    public User registerUser(UserDTO userDTO) {

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists"
            );
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRole(UserRole.USER);

        return userRepository.save(user);
    }

    // ✅ GET ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ GET BY ID
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
                );
    }

    // ✅ DELETE
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    // ✅ LOGIN
    public LoginResponse loginUser(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        // ❌ Email not found
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email account"
            );
        }

        // ❌ Password incorrect
        if (!user.getPassword().equals(password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Incorrect password"
            );
        }

        // ✅ Generate token
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }

    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
}