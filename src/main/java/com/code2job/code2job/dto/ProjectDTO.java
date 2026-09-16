package com.code2job.code2job.dto.resume;

public record ProjectDTO(
        String name,
        String description,
        String contribution,
        String technologies,
        String outcome,
        String projectUrl,
        String githubUrl
) {
}