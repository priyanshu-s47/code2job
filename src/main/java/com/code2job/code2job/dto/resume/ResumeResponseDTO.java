package com.code2job.code2job.dto.resume;

import java.util.List;

public record ResumeResponseDTO(
        String professionalSummary,
        List<String> experienceBullets,
        String projectDescription,
        List<String> technicalSkills,
        List<String> softSkills,
        String additionalInformation
) {
}