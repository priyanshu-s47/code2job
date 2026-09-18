package com.code2job.code2job.service;

import com.code2job.code2job.dto.sanitizer.SanitizerRequestDTO;
import com.code2job.code2job.dto.sanitizer.SanitizerResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class SanitizerService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SanitizerService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public SanitizerResponseDTO analyze(SanitizerRequestDTO request) {

        validateRequest(request);

        String prompt = buildPrompt(request);

        String aiResponse = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        if (aiResponse == null || aiResponse.isBlank()) {
            throw new RuntimeException("Gemini returned an empty response.");
        }

        try {

            String cleanJson = cleanJsonResponse(aiResponse);

            return objectMapper.readValue(
                    cleanJson,
                    SanitizerResponseDTO.class
            );

        } catch (Exception e) {

            System.err.println("Gemini response parsing failed:");
            System.err.println(aiResponse);

            throw new RuntimeException(
                    "Unable to parse Gemini sanitizer response.",
                    e
            );
        }
    }

    private void validateRequest(SanitizerRequestDTO request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Request cannot be null."
            );
        }

        if (request.code() == null || request.code().isBlank()) {
            throw new IllegalArgumentException(
                    "Code cannot be empty."
            );
        }

        if (request.code().length() > 30000) {
            throw new IllegalArgumentException(
                    "Code is too large. Please submit a smaller code section."
            );
        }
    }

    private String buildPrompt(SanitizerRequestDTO request) {

        String context = request.context() == null
                ? "No additional context provided."
                : request.context();

        String goal = request.developerGoal() == null
                ? "General code review."
                : request.developerGoal();

        return """
                You are the Code2Job Code Review Engine.

                Analyze the developer's source code.

                IMPORTANT RULES:

                - Do not invent facts.
                - Only report issues supported by the supplied code.
                - Do not claim a vulnerability is confirmed if the code
                  only indicates a possible risk.
                - Do not invent technologies, metrics, achievements,
                  responsibilities or implementation details.
                - Resume statements must be based only on visible code.
                - If there is insufficient evidence for a resume statement,
                  return an empty list.
                - Keep the response concise and practical.

                SECURITY REVIEW:

                Look for:
                - authentication problems
                - authorization problems
                - injection risks
                - hardcoded secrets
                - unsafe password handling
                - sensitive information exposure
                - unsafe input handling
                - insecure configuration
                - cryptographic issues

                PERFORMANCE REVIEW:

                Look for:
                - unnecessary database calls
                - N+1 queries
                - inefficient loops
                - repeated expensive operations
                - unnecessary API calls
                - inefficient collection usage
                - blocking operations

                RESUME STATEMENTS:

                Generate concise ATS-friendly bullets only from actual
                implementation evidence in the supplied code.

                Never invent percentages or performance metrics.

                Developer context:
                %s

                Developer goal:
                %s

                SOURCE CODE:
                %s

                Return ONLY valid JSON.

                Do NOT use markdown.
                Do NOT wrap JSON inside ```json.

                Required JSON:

                {
                  "securityFindings": [
                    {
                      "title": "string",
                      "severity": "Low | Medium | High",
                      "description": "string",
                      "codeEvidence": "string",
                      "recommendation": "string"
                    }
                  ],
                  "performanceFindings": [
                    {
                      "title": "string",
                      "severity": "Low | Medium | High",
                      "description": "string",
                      "codeEvidence": "string",
                      "recommendation": "string"
                    }
                  ],
                  "resumeStatements": [
                    "string"
                  ]
                }
                """.formatted(
                context,
                goal,
                request.code()
        );
    }

    private String cleanJsonResponse(String response) {

        String cleaned = response.trim();

        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
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
}