package com.example.backend.model;

import com.example.backend.enums.GuiderStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "guiders")
public class Guider {

    @Id
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

    private GuiderStatus status = GuiderStatus.UNVERIFIED;
}