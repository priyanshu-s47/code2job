package com.code2job.code2job.dto.sanitizer;

public record FindingDTO(
        String title,
        String severity,
        String description,
        String codeEvidence,
        String recommendation
) {
}