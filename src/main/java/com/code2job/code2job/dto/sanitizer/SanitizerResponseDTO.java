package com.code2job.code2job.dto.sanitizer;

import java.util.List;

public record SanitizerResponseDTO(
        List<FindingDTO> securityFindings,
        List<FindingDTO> performanceFindings,
        List<String> resumeStatements
) {
}