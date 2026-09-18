package com.code2job.code2job.controller;

import com.code2job.code2job.dto.sanitizer.SanitizerRequestDTO;
import com.code2job.code2job.dto.sanitizer.SanitizerResponseDTO;
import com.code2job.code2job.service.SanitizerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sanitizer")
public class SanitizerController {

    private final SanitizerService sanitizerService;

    public SanitizerController(SanitizerService sanitizerService) {
        this.sanitizerService = sanitizerService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<SanitizerResponseDTO> analyze(
            @RequestBody SanitizerRequestDTO request
    ) {
        return ResponseEntity.ok(
                sanitizerService.analyze(request)
        );
    }
}