package com.code2job.code2job.ai;

import com.code2job.code2job.dto.resume.ResumeAiContentDTO;
import com.code2job.code2job.dto.resume.ResumeRequestDTO;
import com.code2job.code2job.dto.resume.ResumeResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public GeminiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public String testConnection() {

        return chatClient
                .prompt()
                .user(
                        "Reply with exactly: " +
                                "Code2Job Gemini connection successful."
                )
                .call()
                .content();
    }

    public ResumeResponseDTO generateResume(
            ResumeRequestDTO request
    ) {

        String prompt = buildResumePrompt(request);

        String response = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        ResumeAiContentDTO aiContent =
                parseAiResponse(response);

        return buildResumeResponse(request, aiContent);
    }

    private ResumeAiContentDTO parseAiResponse(
            String response
    ) {

        try {

            String json = cleanJsonResponse(response);

            return objectMapper.readValue(
                    json,
                    ResumeAiContentDTO.class
            );

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Failed to parse Gemini resume response.",
                    exception
            );
        }
    }

    private ResumeResponseDTO buildResumeResponse(
            ResumeRequestDTO request,
            ResumeAiContentDTO aiContent
    ) {

        return new ResumeResponseDTO(

                request.personal(),

                request.career(),

                request.education(),

                request.experience(),

                request.project(),

                aiContent.professionalSummary(),

                aiContent.experienceBullets(),

                aiContent.projectBullets(),

                aiContent.technicalSkillCategories(),

                aiContent.softSkills(),

                aiContent.additionalInformation()
        );
    }

    private String cleanJsonResponse(
            String response
    ) {

        if (response == null || response.isBlank()) {

            throw new IllegalStateException(
                    "Gemini returned an empty response."
            );
        }

        String cleaned = response.trim();

        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        }

        if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }

        if (cleaned.endsWith("```")) {

            cleaned = cleaned.substring(
                    0,
                    cleaned.length() - 3
            );
        }

        return cleaned.trim();
    }

    private String buildResumePrompt(
            ResumeRequestDTO request
    ) {

        return """
                You are Code2Job's professional resume content engine.

                Your job is to transform the user's real career information into
                concise, natural, professional and ATS-compatible resume content.

                The resume must feel human-written and professionally edited.

                ============================================================
                CORE PRINCIPLE
                ============================================================

                FACTUAL ACCURACY IS MORE IMPORTANT THAN MAKING THE RESUME SOUND
                IMPRESSIVE.

                Use ONLY information explicitly supplied by the user.

                NEVER invent or assume:

                - employers
                - companies
                - job titles
                - responsibilities
                - technologies
                - programming languages
                - frameworks
                - libraries
                - tools
                - certifications
                - awards
                - achievements
                - metrics
                - percentages
                - users
                - revenue
                - team size
                - years of experience
                - project features
                - business impact
                - deployment platforms
                - educational achievements

                Never infer a technology simply because another technology commonly
                uses it.

                Example:

                If the user provides:

                Java, Spring Boot

                Do NOT add:

                Hibernate, JPA, Maven, Gradle, Docker, AWS or MySQL.

                ============================================================
                WRITING STYLE
                ============================================================

                Write like an experienced human resume writer.

                Use:

                - clear language
                - concise sentences
                - professional terminology
                - natural wording
                - specific information from the candidate

                Avoid generic AI-style language such as:

                "highly motivated"
                "passionate professional"
                "results-driven"
                "dynamic professional"
                "proven track record"
                "cutting-edge"
                "robust"
                "leveraged"
                "spearheaded"
                "orchestrated"

                unless genuinely appropriate and directly supported.

                Do not use exaggerated language.

                Do not keyword-stuff.

                Do not mention AI, Gemini, ChatGPT or resume generation.

                ============================================================
                PROFESSIONAL SUMMARY
                ============================================================

                Generate a strong professional positioning statement.

                Normally use 2-4 concise sentences.

                The summary should naturally communicate:

                - who the candidate is professionally
                - target role
                - relevant background
                - relevant technical or domain capabilities
                - relevant education, experience or projects when useful

                Do NOT simply list skills.

                Do NOT repeat every piece of information from the input.

                Make the summary specific to this candidate.

                If the candidate is a fresher:

                - do not imply employment experience
                - use education, projects, technical foundation and target role
                - clearly maintain the distinction between academic/project work
                  and professional employment

                If the candidate has professional experience:

                - prioritize relevant professional experience
                - mention relevant responsibilities and technologies
                - avoid unnecessary repetition

                If the candidate is a career switcher:

                - connect the transition only through supplied education,
                  experience, projects or skills
                - never invent transferable achievements

                ============================================================
                EXPERIENCE BULLETS
                ============================================================

                Convert supplied responsibilities, tools and results into
                professional resume bullets.

                Prefer:

                Action + Work + Technology/Context + Result

                only when the supplied information supports those elements.

                If a result is not supplied, do not invent one.

                Never create metrics or business impact.

                Never exaggerate ownership.

                Keep bullets concise and useful.

                ============================================================
                PROJECT BULLETS
                ============================================================

                Convert the supplied project information into 2-6 concise
                resume bullets when enough information exists.

                When supported by the user's information, cover:

                - project purpose
                - implementation
                - personal contribution
                - technologies
                - important functionality
                - outcome

                Do not invent features, users, scale, deployment or impact.

                If the user provides only limited project information,
                generate fewer bullets.

                Never create unsupported details just to reach a target number.

                ============================================================
                TECHNICAL SKILLS
                ============================================================

                Extract ONLY technical skills explicitly supplied by the user.

                Automatically classify each supplied technical skill into its
                most appropriate category.

                Possible categories include:

                Programming Languages
                Frameworks
                Libraries
                Databases
                Development Tools
                Testing Tools
                API & Integration Tools
                Version Control
                Cloud & Platforms
                DevOps & Deployment
                Data & Analytics
                Operating Systems
                Design Tools
                Productivity Tools
                Domain Tools
                Other Technical Skills

                Do not create empty categories.

                Do not add technologies that were not supplied.

                Do not duplicate a skill unnecessarily.

                Preserve recognizable technology names accurately.

                Examples of classification:

                Java -> Programming Languages

                Python -> Programming Languages

                Spring Boot -> Frameworks

                PostgreSQL -> Databases

                IntelliJ IDEA -> Development Tools

                Git -> Version Control

                GitHub -> Version Control

                JUnit -> Testing Tools

                Postman -> API & Integration Tools

                Excel -> Productivity Tools or Data & Analytics,
                depending on the supplied context.

                These examples explain classification logic only.
                They are NOT permission to add those technologies.

                ============================================================
                SOFT SKILLS
                ============================================================

                Include soft skills only when the user explicitly provides them
                or clearly describes them.

                Do NOT automatically add common resume soft skills.

                For example, do not add communication, teamwork or leadership
                merely because they are common resume terms.

                ============================================================
                ADDITIONAL INFORMATION
                ============================================================

                Include useful user-provided information that does not naturally
                belong in the summary, experience, project or skills sections.

                Avoid unnecessary duplication.

                ============================================================
                ATS COMPATIBILITY
                ============================================================

                Content must work well with conventional ATS parsing.

                Use:

                - standard section terminology
                - accurate technology names
                - concise bullets
                - normal professional language
                - relevant terminology from the user's actual background

                Avoid:

                - decorative symbols
                - keyword stuffing
                - excessive adjectives
                - unusual formatting language
                - unsupported keywords

                ============================================================
                IMPORTANT DATA OWNERSHIP RULE
                ============================================================

                The following information is NOT to be rewritten or regenerated
                by you:

                - name
                - email
                - phone
                - location
                - LinkedIn
                - GitHub
                - portfolio
                - degree
                - institution
                - specialization
                - education dates
                - education grade
                - original company name
                - original job title
                - original project name

                These values will be taken directly from the user's original
                submission by the application.

                Your task is to generate only derived resume content.

                ============================================================
                OUTPUT FORMAT
                ============================================================

                Return ONLY valid JSON.

                No markdown.

                No code fences.

                No explanation.

                Use exactly this structure:

                {
                  "professionalSummary": "string",
                  "experienceBullets": [
                    "string"
                  ],
                  "projectBullets": [
                    "string"
                  ],
                  "technicalSkillCategories": [
                    {
                      "category": "Programming Languages",
                      "skills": [
                        "Java"
                      ]
                    }
                  ],
                  "softSkills": [
                    "string"
                  ],
                  "additionalInformation": "string"
                }

                If there is no experience:

                "experienceBullets": []

                If there is no project information:

                "projectBullets": []

                If there are no technical skills:

                "technicalSkillCategories": []

                If there are no soft skills:

                "softSkills": []

                If there is no additional information:

                "additionalInformation": ""

                ============================================================
                USER DATA
                ============================================================

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