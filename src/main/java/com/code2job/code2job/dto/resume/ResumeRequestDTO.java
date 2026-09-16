package com.code2job.code2job.dto.resume;

public record ResumeRequestDTO(
        PersonalDetailsDTO personal,
        CareerDetailsDTO career,
        EducationDTO education,
        ExperienceDTO experience,
        ProjectDTO project,
        SkillsDTO skills
) {
}