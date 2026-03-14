package com.example.backend.repository;

import com.example.backend.model.Guider;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GuiderRepository extends MongoRepository<Guider,String> {

    Optional<Guider> findByEmail(String email);

    Optional<Guider> findByPhoneNumber(String phoneNumber);
}