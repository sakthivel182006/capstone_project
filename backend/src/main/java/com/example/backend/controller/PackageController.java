package com.example.backend.controller;

import com.example.backend.dto.PackageResponseDTO;
import com.example.backend.dto.PackageStatusUpdateDTO;
import com.example.backend.service.PackageService;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/packages")

public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @PostMapping(
        value = "/create",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public PackageResponseDTO createPackage(

            @RequestParam String guiderId,
            @RequestParam String packageTitle,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam double price,
            @RequestParam int maxPeople,
            @RequestParam int durationDays,
            @RequestParam String startLocation,
            @RequestParam String endLocation,
            @RequestParam String difficultyLevel,
            @RequestParam boolean foodIncluded,
            @RequestParam boolean transportIncluded,
            @RequestParam MultipartFile[] images

    ) throws Exception {

        return packageService.createPackage(
                guiderId,
                packageTitle,
                description,
                location,
                price,
                maxPeople,
                durationDays,
                startLocation,
                endLocation,
                difficultyLevel,
                foodIncluded,
                transportIncluded,
                images
        );
    }

    @GetMapping("/guider/{guiderId}")
    public List<PackageResponseDTO> getPackagesByGuider(@PathVariable String guiderId){
        return packageService.getPackagesByGuider(guiderId);
    }

    @DeleteMapping("/{packageId}")
    public String deletePackage(@PathVariable String packageId){

        packageService.deletePackage(packageId);
        return "Deleted";
    }



    @GetMapping
public List<PackageResponseDTO> getAllPackages() {

    return packageService.getAllPackages();

}


@GetMapping("/verified")
public List<PackageResponseDTO> getVerifiedPackages() {

    return packageService.getVerifiedPackages();

}


@PutMapping("/{packageId}/status")
public PackageResponseDTO updatePackageStatus(
        @PathVariable String packageId,
        @RequestBody PackageStatusUpdateDTO statusDTO) {

    return packageService.updatePackageStatus(
            packageId,
            statusDTO.getStatus()
    );
}



}


