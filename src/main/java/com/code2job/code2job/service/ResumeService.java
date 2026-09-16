package com.code2job.code2job.service;

import com.code2job.code2job.ai.GeminiService;
import com.code2job.code2job.dto.resume.ResumeRequestDTO;
import com.code2job.code2job.dto.resume.ResumeResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    private final GeminiService geminiService;

    public ResumeService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public ResumeResponseDTO generateResume(ResumeRequestDTO request) {
        return geminiService.generateResume(request);
    }
}