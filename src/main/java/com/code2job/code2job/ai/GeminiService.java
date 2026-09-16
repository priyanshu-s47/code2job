package com.code2job.code2job.ai;

import com.code2job.code2job.dto.resume.ResumeRequestDTO;
import com.code2job.code2job.dto.resume.ResumeResponseDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeminiService {

    private final ChatClient chatClient;

    public GeminiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String testConnection() {
        return chatClient
                .prompt()
                .user("Reply with exactly: Code2Job Gemini connection successful.")
                .call()
                .content();
    }

    public ResumeResponseDTO generateResume(ResumeRequestDTO request) {

        String prompt = buildResumePrompt(request);

        String response = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return new ResumeResponseDTO(
                response,
                List.of(),
                "",
                List.of(),
                List.of(),
                ""
        );
    }

    private String buildResumePrompt(ResumeRequestDTO request) {

        return """
                You are a professional resume writer.

                Create professional, ATS-friendly resume content using ONLY
                the information provided by the user.

                IMPORTANT RULES:
                1. Never invent employers, job titles, responsibilities,
                   technologies, certifications, achievements, metrics,
                   awards or experience.
                2. Do not create fake numbers or percentages.
                3. Do not add skills that are not present in the input.
                4. Do not exaggerate the user's experience.
                5. Improve grammar and professional wording.
                6. Keep the writing natural and human-sounding.
                7. Use concise resume language.
                8. If information is missing, do not make it up.
                9. Generate a short professional summary from the supplied
                   career and experience information.
                10. Do not mention that AI was used.

                USER RESUME DATA:

                PERSONAL INFORMATION:
                %s

                CAREER INFORMATION:
                %s

                EDUCATION:
                %s

                EXPERIENCE:
                %s

                PROJECT:
                %s

                SKILLS:
                %s

                Return the result in this exact structure:

                PROFESSIONAL SUMMARY:
                <short professional summary>

                EXPERIENCE BULLETS:
                - <bullet>
                - <bullet>

                PROJECT DESCRIPTION:
                <professional project description>

                TECHNICAL SKILLS:
                <comma-separated technical skills>

                SOFT SKILLS:
                <comma-separated soft skills>

                ADDITIONAL INFORMATION:
                <additional information if supplied, otherwise leave empty>
                """.formatted(
                request.personal(),
                request.career(),
                request.education(),
                request.experience(),
                request.project(),
                request.skills()
        );
    }
}