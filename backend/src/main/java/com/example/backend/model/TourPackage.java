package com.example.backend.model;

import com.example.backend.enums.PackageStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "packages")
public class TourPackage {

    @Id
    private String packageId;

    private String guiderId;

    private String packageTitle;

    private String description;

    private String location;

    private double price;

    private int maxPeople;

    private int durationDays;

    private List<String> packageImages;

    private List<String> itinerary;

    private List<String> includedServices;

    private List<String> excludedServices;

    private String startLocation;

    private String endLocation;

    private boolean foodIncluded;

    private boolean transportIncluded;

    private String difficultyLevel;

    private double rating;

    private int totalBookings;

    private PackageStatus status;

    private Date createdAt;

    private Date updatedAt;
}