package com.example.backend.controller;

import com.example.backend.dto.GuiderResponseDTO;
import com.example.backend.dto.GuiderStatusUpdateDTO;
import com.example.backend.service.GuiderService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/guiders")
@CrossOrigin
public class GuiderController {

    private final GuiderService guiderService;

    public GuiderController(GuiderService guiderService){
        this.guiderService = guiderService;
    }

    @PostMapping("/create")
    public GuiderResponseDTO createGuiderProfile(

            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String phoneNumber,
            @RequestParam String address,
            @RequestParam String location,
            @RequestParam String localGuideDetails,
            @RequestParam MultipartFile guiderPhoto,
            @RequestParam MultipartFile[] documents

    ) throws Exception {

        return guiderService.createGuiderProfile(
            name,
                email,
                password,
                phoneNumber,
                address,
                location,
                localGuideDetails,
                guiderPhoto,
                documents
        );
    }

    @GetMapping
    public List<GuiderResponseDTO> getAllGuiders(){

        return guiderService.getAllGuiders();
    }

    @GetMapping("/{guiderId}")
    public GuiderResponseDTO getGuiderById(@PathVariable String guiderId){

        return guiderService.getGuiderById(guiderId);
    }



    @PutMapping("/{guiderId}/status")
public GuiderResponseDTO updateGuiderStatus(
        @PathVariable String guiderId,
        @RequestBody GuiderStatusUpdateDTO statusDTO){

    return guiderService.updateGuiderStatus(
            guiderId,
            statusDTO.getStatus()
    );
}


}