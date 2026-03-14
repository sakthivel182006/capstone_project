package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.dto.GuiderResponseDTO;
import com.example.backend.enums.GuiderStatus;
import com.example.backend.model.Guider;
import com.example.backend.repository.GuiderRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class GuiderService {

    private final GuiderRepository guiderRepository;
    private final Cloudinary cloudinary;

    public GuiderService(GuiderRepository guiderRepository, Cloudinary cloudinary) {
        this.guiderRepository = guiderRepository;
        this.cloudinary = cloudinary;
    }

    public GuiderResponseDTO createGuiderProfile(
        String name,
            String email,
            String password,
            String phoneNumber,
            String address,
            String location,
            String localGuideDetails,
            MultipartFile guiderPhoto,
            MultipartFile[] documents
    ) throws Exception {

        if (guiderRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already used");
        }

        if (guiderRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new RuntimeException("Phone already used");
        }

        if (documents == null || documents.length < 2) {
            throw new RuntimeException("Minimum 2 documents required");
        }

        if (guiderPhoto == null || guiderPhoto.isEmpty()) {
            throw new RuntimeException("Guider photo required");
        }

        String imageType = guiderPhoto.getContentType();

        if (imageType == null || !imageType.startsWith("image/")) {
            throw new RuntimeException("Invalid image format");
        }

        if (guiderPhoto.getSize() > 2 * 1024 * 1024) {
            throw new RuntimeException("Image must be under 2MB");
        }

        Map<String, Object> imageUpload = cloudinary.uploader().upload(
                guiderPhoto.getBytes(),
                ObjectUtils.asMap(
                        "folder", "tourislocalguiders/images"
                )
        );

        String imageUrl = imageUpload.get("secure_url").toString();

        List<String> documentUrls = new ArrayList<>();

        for (MultipartFile doc : documents) {

            if (doc == null || doc.isEmpty()) {
                continue;
            }

            String type = doc.getContentType();

            if (type == null || !type.equals("application/pdf")) {
                throw new RuntimeException("Only PDF documents allowed");
            }

            if (doc.getSize() > 5 * 1024 * 1024) {
                throw new RuntimeException("Document must be under 5MB");
            }

            Map<String, Object> upload = cloudinary.uploader().upload(
                    doc.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "tourislocalguiders/documents",
                            "resource_type", "raw",
                            "use_filename", true,
                            "unique_filename", false
                    )
            );

            String documentUrl = upload.get("secure_url").toString();

            documentUrls.add(documentUrl);
        }

        Guider guider = new Guider();

        guider.setName(name);
        guider.setEmail(email);
        guider.setPassword(password);
        guider.setPhoneNumber(phoneNumber);
        guider.setAddress(address);
        guider.setLocation(location);
        guider.setLocalGuideDetails(localGuideDetails);
        guider.setGuiderImage(imageUrl);
        guider.setDocuments(documentUrls);
        guider.setStatus(GuiderStatus.UNVERIFIED);

        Guider saved = guiderRepository.save(guider);

        return mapToDTO(saved);
    }

    public List<GuiderResponseDTO> getAllGuiders() {

        List<Guider> guiders = guiderRepository.findAll();
        List<GuiderResponseDTO> response = new ArrayList<>();

        for (Guider g : guiders) {
            response.add(mapToDTO(g));
        }

        return response;
    }

    public GuiderResponseDTO getGuiderById(String guiderId) {

        Guider guider = guiderRepository.findById(guiderId)
                .orElseThrow(() -> new RuntimeException("Guider not found"));

        return mapToDTO(guider);
    }

    public GuiderResponseDTO updateGuiderStatus(String guiderId, String status) {

        Guider guider = guiderRepository.findById(guiderId)
                .orElseThrow(() -> new RuntimeException("Guider not found"));

        guider.setStatus(GuiderStatus.valueOf(status.toUpperCase()));

        Guider saved = guiderRepository.save(guider);

        return mapToDTO(saved);
    }

    private GuiderResponseDTO mapToDTO(Guider guider) {

        GuiderResponseDTO dto = new GuiderResponseDTO();

        dto.setGuiderId(guider.getGuiderId());
        dto.setName(guider.getName());
        dto.setEmail(guider.getEmail());
        dto.setPassword(guider.getPassword());
        dto.setPhoneNumber(guider.getPhoneNumber());
        dto.setAddress(guider.getAddress());
        dto.setLocation(guider.getLocation());
        dto.setLocalGuideDetails(guider.getLocalGuideDetails());
        dto.setGuiderImage(guider.getGuiderImage());
        dto.setDocuments(guider.getDocuments());
        dto.setStatus(guider.getStatus().name());

        return dto;
    }
}