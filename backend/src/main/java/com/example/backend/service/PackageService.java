package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.dto.PackageResponseDTO;
import com.example.backend.enums.PackageStatus;
import com.example.backend.model.TourPackage;
import com.example.backend.repository.PackageRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class PackageService {

    private final PackageRepository packageRepository;
    private final Cloudinary cloudinary;

    public PackageService(PackageRepository packageRepository, Cloudinary cloudinary) {
        this.packageRepository = packageRepository;
        this.cloudinary = cloudinary;
    }

    // CREATE PACKAGE
    public PackageResponseDTO createPackage(

            String guiderId,
            String packageTitle,
            String description,
            String location,
            double price,
            int maxPeople,
            int durationDays,
            String startLocation,
            String endLocation,
            String difficultyLevel,
            boolean foodIncluded,
            boolean transportIncluded,
            MultipartFile[] images

    ) throws Exception {

        if(images == null || images.length < 2){
            throw new RuntimeException("Minimum 2 images required");
        }

        if(images.length > 7){
            throw new RuntimeException("Maximum 7 images allowed");
        }

        List<String> imageUrls = uploadImages(images);

        TourPackage pkg = new TourPackage();

        pkg.setGuiderId(guiderId);
        pkg.setPackageTitle(packageTitle);
        pkg.setDescription(description);
        pkg.setLocation(location);
        pkg.setPrice(price);
        pkg.setMaxPeople(maxPeople);
        pkg.setDurationDays(durationDays);
        pkg.setStartLocation(startLocation);
        pkg.setEndLocation(endLocation);
        pkg.setDifficultyLevel(difficultyLevel);
        pkg.setFoodIncluded(foodIncluded);
        pkg.setTransportIncluded(transportIncluded);

        pkg.setPackageImages(imageUrls);

        pkg.setRating(0);
        pkg.setTotalBookings(0);
        pkg.setStatus(PackageStatus.VERIFYING);

        pkg.setCreatedAt(new Date());
        pkg.setUpdatedAt(new Date());

        TourPackage saved = packageRepository.save(pkg);

        return mapToDTO(saved);
    }

    // GET PACKAGES BY GUIDER
    public List<PackageResponseDTO> getPackagesByGuider(String guiderId){

        List<TourPackage> list = packageRepository.findByGuiderId(guiderId);

        List<PackageResponseDTO> response = new ArrayList<>();

        for(TourPackage p : list){
            response.add(mapToDTO(p));
        }

        return response;
    }

    // UPDATE PACKAGE
    public PackageResponseDTO updatePackage(

            String packageId,
            String packageTitle,
            String description,
            String location,
            double price,
            int maxPeople,
            int durationDays,
            String startLocation,
            String endLocation,
            String difficultyLevel,
            boolean foodIncluded,
            boolean transportIncluded,
            MultipartFile[] images

    ) throws Exception {

        TourPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        List<String> imageUrls = pkg.getPackageImages();

        if(images != null && images.length > 0){

            if(images.length < 2 || images.length > 7){
                throw new RuntimeException("Images must be between 2 and 7");
            }

            imageUrls = uploadImages(images);
        }

        pkg.setPackageTitle(packageTitle);
        pkg.setDescription(description);
        pkg.setLocation(location);
        pkg.setPrice(price);
        pkg.setMaxPeople(maxPeople);
        pkg.setDurationDays(durationDays);
        pkg.setStartLocation(startLocation);
        pkg.setEndLocation(endLocation);
        pkg.setDifficultyLevel(difficultyLevel);
        pkg.setFoodIncluded(foodIncluded);
        pkg.setTransportIncluded(transportIncluded);

        pkg.setPackageImages(imageUrls);
        pkg.setUpdatedAt(new Date());

        TourPackage saved = packageRepository.save(pkg);

        return mapToDTO(saved);
    }

    // DELETE PACKAGE
    public void deletePackage(String packageId){
        packageRepository.deleteById(packageId);
    }

    // CLOUDINARY IMAGE UPLOAD
    private List<String> uploadImages(MultipartFile[] images) throws Exception {

        List<String> imageUrls = new ArrayList<>();

        for(MultipartFile image : images){

            Map<String,Object> upload = cloudinary.uploader().upload(
                    image.getBytes(),
                    ObjectUtils.asMap(
                            "folder","tourislocalguiders/packages"
                    )
            );

            imageUrls.add(upload.get("secure_url").toString());
        }

        return imageUrls;
    }

    // DTO MAPPING
    private PackageResponseDTO mapToDTO(TourPackage pkg){

        PackageResponseDTO dto = new PackageResponseDTO();

        dto.setPackageId(pkg.getPackageId());
        dto.setGuiderId(pkg.getGuiderId());
        dto.setPackageTitle(pkg.getPackageTitle());
        dto.setDescription(pkg.getDescription());
        dto.setLocation(pkg.getLocation());
        dto.setPrice(pkg.getPrice());
        dto.setMaxPeople(pkg.getMaxPeople());
        dto.setDurationDays(pkg.getDurationDays());
        dto.setPackageImages(pkg.getPackageImages());
        dto.setStartLocation(pkg.getStartLocation());
        dto.setEndLocation(pkg.getEndLocation());
        dto.setDifficultyLevel(pkg.getDifficultyLevel());
        dto.setFoodIncluded(pkg.isFoodIncluded());
        dto.setTransportIncluded(pkg.isTransportIncluded());
        dto.setStatus(pkg.getStatus());

        return dto;
    }


public List<PackageResponseDTO> getAllPackages() {

    List<TourPackage> list = packageRepository.findAll();

    List<PackageResponseDTO> response = new ArrayList<>();

    for (TourPackage p : list) {
        response.add(mapToDTO(p));
    }

    return response;
}


public List<PackageResponseDTO> getVerifiedPackages() {

    List<TourPackage> list = packageRepository.findByStatus(PackageStatus.VERIFIED);

    List<PackageResponseDTO> response = new ArrayList<>();

    for (TourPackage p : list) {
        response.add(mapToDTO(p));
    }

    return response;
}



public PackageResponseDTO updatePackageStatus(String packageId, String status) {

    TourPackage pkg = packageRepository.findById(packageId)
            .orElseThrow(() -> new RuntimeException("Package not found"));

    pkg.setStatus(PackageStatus.valueOf(status.toUpperCase()));

    pkg.setUpdatedAt(new Date());

    TourPackage saved = packageRepository.save(pkg);

    return mapToDTO(saved);
}



}
