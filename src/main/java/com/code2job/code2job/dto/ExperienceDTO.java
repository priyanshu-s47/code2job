package com.code2job.code2job.dto.resume;

public record ExperienceDTO(
        String company,
        String jobTitle,
        String location,
        String startDate,
        String endDate,
        String responsibilities,
        String tools,
        String results
) {
}