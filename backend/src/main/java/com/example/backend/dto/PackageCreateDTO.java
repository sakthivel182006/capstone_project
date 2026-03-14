package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class PackageCreateDTO {

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

}