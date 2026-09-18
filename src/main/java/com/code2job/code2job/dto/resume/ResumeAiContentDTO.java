package com.code2job.code2job.dto.resume;

import java.util.List;

public record ResumeAiContentDTO(

        String professionalSummary,

        List<String> experienceBullets,

        List<String> projectBullets,

        List<SkillCategoryDTO> technicalSkillCategories,

        List<String> softSkills,

        String additionalInformation

) {
}