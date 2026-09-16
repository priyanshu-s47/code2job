package com.code2job.code2job.controller;

import com.code2job.code2job.dto.resume.ResumeRequestDTO;
import com.code2job.code2job.dto.resume.ResumeResponseDTO;
import com.code2job.code2job.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ResumeResponseDTO> generateResume(
            @RequestBody ResumeRequestDTO request) {

        ResumeResponseDTO response =
                resumeService.generateResume(request);

        return ResponseEntity.ok(response);
    }
}