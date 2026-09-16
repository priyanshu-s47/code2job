package com.code2job.code2job.controller;

import com.code2job.code2job.ai.GeminiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiTestController {

    private final GeminiService geminiService;

    public AiTestController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/api/ai/test")
    public String testGemini() {
        return geminiService.testConnection();
    }
}