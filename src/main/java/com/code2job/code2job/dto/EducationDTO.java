package com.code2job.code2job.dto.resume;

public record EducationDTO(
        String degree,
        String institution,
        String specialization,
        String startYear,
        String endYear,
        String grade
) {
}