package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailCheckcontroller {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/test-mail")
    public ResponseEntity<String> sendTestMail(@RequestParam String toEmail) {
        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("sakthivelv202222@gmail.com");  // or use environment variable
            message.setTo(toEmail);
            message.setSubject("SMTP Test Mail");
            message.setText("Hello,\n\nThis is a test email from Spring Boot deployed on Render.\n\nRegards,\nSakthivel");

            mailSender.send(message);

            return ResponseEntity.ok("Email sent successfully!");

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Failed to send email: " + e.getMessage());
        }
    }
}