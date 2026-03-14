package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.UserDTO;
import com.example.backend.enums.GuiderStatus;
import com.example.backend.enums.UserRole;
import com.example.backend.model.Guider;
import com.example.backend.model.User;
import com.example.backend.repository.GuiderRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final GuiderRepository guiderRepository;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, GuiderRepository guiderRepository) {
        this.userRepository = userRepository;
        this.guiderRepository=guiderRepository;

        
        this.jwtUtil = jwtUtil;
    }

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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
                );
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public LoginResponse loginUser(String email, String password) {

    // 1️⃣ Check in USER module
    User user = userRepository.findByEmail(email).orElse(null);

    if (user != null) {

        if (!user.getPassword().equals(password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Incorrect password"
            );
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }

    // 2️⃣ If not user → check GUIDER module
    Guider guider = guiderRepository.findByEmail(email).orElse(null);

    if (guider == null) {
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Account not found"
        );
    }

    // 3️⃣ Check password
    if (!guider.getPassword().equals(password)) {
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Incorrect password"
        );
    }

    // 4️⃣ Check status
    if (!guider.getStatus().equals(GuiderStatus.VERIFIED)) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Guider account not verified by admin"
        );
    }

    // 5️⃣ Generate token
    String token = jwtUtil.generateToken(guider.getEmail());

    return new LoginResponse(
            guider.getGuiderId(),
            guider.getName(),
            guider.getEmail(),
            "GUIDER",
            token
    );
}

    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }


    public User updateUserRole(String id, String role) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    try {
        UserRole newRole = UserRole.valueOf(role.toUpperCase());
        user.setRole(newRole);
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Invalid role value. Allowed values: USER, ADMIN");
    }

    return userRepository.save(user);
}

            public void deleteAllUsers() {
    userRepository.deleteAll();
        }
}