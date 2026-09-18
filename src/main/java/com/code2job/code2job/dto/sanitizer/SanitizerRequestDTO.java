package com.code2job.code2job.dto.sanitizer;

public record SanitizerRequestDTO(
        String code,
        String context,
        String developerGoal
) {
}