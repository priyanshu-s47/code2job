package com.code2job.code2job.dto.resume;

import java.util.List;

public record SkillCategoryDTO(
        String category,
        List<String> skills
) {
}