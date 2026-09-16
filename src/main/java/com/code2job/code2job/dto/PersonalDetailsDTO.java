package com.code2job.code2job.dto.resume;

public record PersonalDetailsDTO(
        String fullName,
        String email,
        String phone,
        String location,
        String linkedin,
        String github,
        String portfolio
) {
}
