// package com.example.backend.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.RestTemplate;


// @RestController
// @RequestMapping("/email")
// public class BrevoMailController {

//     @Value("${BREVO_API_KEY}")
//     private String apiKey;

//     @GetMapping("/send")
//     public ResponseEntity<String> sendMail(@RequestParam String toEmail) {

//         try {

//             System.out.println("API KEY = " + apiKey);

//             String url = "https://api.brevo.com/v3/smtp/email";

//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);
//             headers.set("api-key", apiKey.trim());
//             headers.setAccept(List.of(MediaType.APPLICATION_JSON));

//             String body = """
//                 {
//                   "sender": { "email": "sakthivelv202222@gmail.com" },
//                   "to": [{ "email": "%s" }],
//                   "subject": "Brevo API SAKTHIVEL ",
//                   "textContent": "Brevo API working SAKTHIVEL!"
//                 }
//                 """.formatted(toEmail);

//             HttpEntity<String> request = new HttpEntity<>(body, headers);

//             RestTemplate restTemplate = new RestTemplate();
//             ResponseEntity<String> response =
//                     restTemplate.postForEntity(url, request, String.class);

//             return ResponseEntity.ok("Success: " + response.getBody());

//         } catch (Exception e) {
//             return ResponseEntity.badRequest()
//                     .body("Error sending email: " + e.getMessage());
//         }
//     }
// }