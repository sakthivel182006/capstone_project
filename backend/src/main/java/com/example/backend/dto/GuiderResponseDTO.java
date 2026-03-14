package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class GuiderResponseDTO {

    private String guiderId;
    
    private String name;
    

    private String email;
    private String password;

    private String phoneNumber;

    private String address;

    private String location;

    private String localGuideDetails;

    private String guiderImage;

    private List<String> documents;

    private String status;
}