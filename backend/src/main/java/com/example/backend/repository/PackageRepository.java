package com.example.backend.repository;

import com.example.backend.enums.PackageStatus;
import com.example.backend.model.TourPackage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PackageRepository extends MongoRepository<TourPackage, String> {

    List<TourPackage> findByGuiderId(String guiderId);


    List<TourPackage> findByStatus(PackageStatus status);


}