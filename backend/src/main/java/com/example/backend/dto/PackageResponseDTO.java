package com.example.backend.dto;

import com.example.backend.enums.PackageStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PackageResponseDTO {

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