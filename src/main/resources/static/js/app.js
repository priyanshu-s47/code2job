document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    if (page === "resume") {
        initializeResumeBuilder();
    }

    if (page === "ats") {
        initializeAtsAnalyzer();
    }

});


/* =========================================================
   RESUME BUILDER
   ========================================================= */

function initializeResumeBuilder() {

    const resumeForm = document.getElementById("resumeForm");

    if (!resumeForm) {
        return;
    }

    const generateButton =
        document.getElementById("generateResume");

    initializeResumeNavigation();

    if (generateButton) {

        generateButton.addEventListener("click", async (event) => {

            event.preventDefault();

            if (!validateFinalResumeForm()) {
                return;
            }

            const resumeData = collectResumeData();

            console.log("Resume data:", resumeData);

            generateButton.disabled = true;
            generateButton.classList.add("is-loading");

            const originalText = generateButton.textContent;

            generateButton.textContent =
                "Generating with AI...";

            try {

                const result =
                    await generateResumeWithAI(resumeData);

                console.log(
                    "AI resume response:",
                    result
                );

                displayGeneratedResume(result);

                showFormMessage(
                    "Your resume content has been generated successfully.",
                    "success"
                );

            } catch (error) {

                console.error(
                    "Resume generation error:",
                    error
                );

                showFormMessage(
                    "We could not generate your resume right now. Please try again.",
                    "error"
                );

            } finally {

                generateButton.disabled = false;

                generateButton.classList.remove(
                    "is-loading"
                );

                generateButton.textContent =
                    originalText;
            }

        });

    }

}


/* =========================================================
   RESUME NAVIGATION
   ========================================================= */

function initializeResumeNavigation() {

    const navigationButtons =
        document.querySelectorAll(
            "[data-scroll-target]"
        );

    navigationButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.scrollTarget;

            if (!targetId) {
                return;
            }

            const target =
                document.getElementById(targetId);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            target.classList.remove(
                "resume-section-highlight"
            );

            setTimeout(() => {

                target.classList.add(
                    "resume-section-highlight"
                );

            }, 50);

        });

    });

}


/* =========================================================
   RESUME VALIDATION
   ========================================================= */

function validateFinalResumeForm() {

    const requiredFields = [
        "fullName",
        "email",
        "targetRole"
    ];

    let isValid = true;

    requiredFields.forEach((fieldId) => {

        const field =
            document.getElementById(fieldId);

        if (!field) {
            return;
        }

        const value =
            field.value.trim();

        if (!value) {

            field.classList.add(
                "c2j-invalid-input"
            );

            isValid = false;

        } else {

            field.classList.remove(
                "c2j-invalid-input"
            );

        }

    });

    if (!isValid) {

        showFormMessage(
            "Please complete the required fields before generating your resume.",
            "error"
        );

        const firstInvalid =
            document.querySelector(
                ".c2j-invalid-input"
            );

        if (firstInvalid) {

            firstInvalid.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            firstInvalid.focus();
        }

        return false;
    }

    return true;
}


/* =========================================================
   COLLECT RESUME DATA
   ========================================================= */

function collectResumeData() {

    return {

        personal: {

            fullName:
                getFieldValue("fullName"),

            email:
                getFieldValue("email"),

            phone:
                getFieldValue("phone"),

            location:
                getFieldValue("location"),

            linkedin:
                getFieldValue("linkedin"),

            github:
                getFieldValue("github"),

            portfolio:
                getFieldValue("portfolio")

        },

        career: {

            careerType:
                getFieldValue("careerType"),

            targetRole:
                getFieldValue("targetRole"),

            industry:
                getFieldValue("industry"),

            totalExperience:
                getFieldValue("totalExperience"),

            careerContext:
                getFieldValue("careerContext")

        },

        education: {

            degree:
                getFieldValue("degree"),

            institution:
                getFieldValue("institution"),

            specialization:
                getFieldValue("specialization"),

            startYear:
                getFieldValue("educationStartYear"),

            endYear:
                getFieldValue("educationEndYear"),

            grade:
                getFieldValue("educationGrade")

        },

        experience: {

            company:
                getFieldValue("company"),

            jobTitle:
                getFieldValue("jobTitle"),

            location:
                getFieldValue("jobLocation"),

            startDate:
                getFieldValue("jobStartDate"),

            endDate:
                getFieldValue("jobEndDate"),

            responsibilities:
                getFieldValue("responsibilities"),

            tools:
                getFieldValue("experienceTools"),

            results:
                getFieldValue("experienceResults")

        },

        project: {

            name:
                getFieldValue("projectName"),

            description:
                getFieldValue("projectDescription"),

            contribution:
                getFieldValue("projectContribution"),

            technologies:
                getFieldValue("projectTechnologies"),

            outcome:
                getFieldValue("projectOutcome"),

            projectUrl:
                getFieldValue("projectUrl"),

            githubUrl:
                getFieldValue("projectGithub")

        },

        skills: {

            technical:
                getFieldValue("technicalSkills"),

            tools:
                getFieldValue("toolsSkills"),

            soft:
                getFieldValue("softSkills"),

            languages:
                getFieldValue("languages"),

            certifications:
                getFieldValue("certifications"),

            achievements:
                getFieldValue("achievements"),

            additionalInformation:
                getFieldValue("additionalInformation")

        }

    };

}


/* =========================================================
   FIELD HELPER
   ========================================================= */

function getFieldValue(fieldId) {

    const field =
        document.getElementById(fieldId);

    if (!field) {
        return "";
    }

    return field.value.trim();
}


/* =========================================================
   AI RESUME GENERATION
   ========================================================= */

async function generateResumeWithAI(resumeData) {

    const response =
        await fetch("/api/resume/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(resumeData)

        });

    if (!response.ok) {

        let errorMessage =
            "Resume generation failed.";

        try {

            const errorData =
                await response.json();

            if (errorData.message) {
                errorMessage =
                    errorData.message;
            }

        } catch (ignored) {
            // Ignore invalid error response.
        }

        throw new Error(errorMessage);
    }

    return await response.json();
}


/* =========================================================
   DISPLAY GENERATED RESUME
   ========================================================= */

function displayGeneratedResume(result) {

    let resultContainer =
        document.getElementById(
            "generatedResumeResult"
        );

    if (!resultContainer) {

        resultContainer =
            document.createElement("section");

        resultContainer.id =
            "generatedResumeResult";

        resultContainer.className =
            "c2j-card";

        resultContainer.style.marginTop =
            "32px";

        resultContainer.style.padding =
            "30px";

        const form =
            document.getElementById(
                "resumeForm"
            );

        if (form) {

            form.parentNode.insertBefore(
                resultContainer,
                form.nextSibling
            );

        }

    }

    resultContainer.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent =
        "AI Generated Resume Content";

    title.style.marginTop =
        "0";

    resultContainer.appendChild(title);


    /*
     * Current backend returns the AI response
     * inside professionalSummary.
     *
     * This will later be replaced with
     * structured resume sections.
     */

    const content =
        document.createElement("pre");

    content.style.whiteSpace =
        "pre-wrap";

    content.style.fontFamily =
        "inherit";

    content.style.fontSize =
        "15px";

    content.style.lineHeight =
        "1.7";

    content.style.color =
        "var(--c2j-ink)";

    content.textContent =
        result.professionalSummary ||
        "No content generated.";

    resultContainer.appendChild(content);


    resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   FORM MESSAGE
   ========================================================= */

function showFormMessage(message, type) {

    let messageElement =
        document.getElementById(
            "resumeFormMessage"
        );

    if (!messageElement) {

        messageElement =
            document.createElement("div");

        messageElement.id =
            "resumeFormMessage";

        const form =
            document.getElementById(
                "resumeForm"
            );

        if (form) {

            form.parentNode.insertBefore(
                messageElement,
                form
            );

        }

    }

    messageElement.className =
        "c2j-form-message " + type;

    messageElement.textContent =
        message;

    messageElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* =========================================================
   ATS ANALYZER
   ========================================================= */

function initializeAtsAnalyzer() {

    const resumeUploadArea =
        document.getElementById(
            "resumeUploadArea"
        );

    const jdUploadArea =
        document.getElementById(
            "jdUploadArea"
        );

    const resumePdf =
        document.getElementById(
            "resumePdf"
        );

    const jdPdf =
        document.getElementById(
            "jdPdf"
        );

    const analyzeButton =
        document.getElementById(
            "analyzeAts"
        );

    const jobDescription =
        document.getElementById(
            "jobDescription"
        );


    /* -----------------------------------------------------
       Resume PDF Upload
       ----------------------------------------------------- */

    if (resumeUploadArea && resumePdf) {

        resumeUploadArea.addEventListener(
            "click",
            () => {
                resumePdf.click();
            }
        );

        resumePdf.addEventListener(
            "change",
            () => {

                const file =
                    resumePdf.files[0];

                if (!file) {
                    return;
                }

                if (!validatePdfFile(file)) {

                    resumePdf.value = "";

                    showAtsMessage(
                        "Please upload a valid PDF file up to 5 MB.",
                        "error"
                    );

                    return;
                }

                const fileName =
                    document.getElementById(
                        "resumeFileName"
                    );

                if (fileName) {

                    fileName.textContent =
                        file.name;

                }

                resumeUploadArea.classList.add(
                    "uploaded"
                );

                hideAtsMessage();

            }
        );

    }


    /* -----------------------------------------------------
       Job Description PDF Upload
       ----------------------------------------------------- */

    if (jdUploadArea && jdPdf) {

        jdUploadArea.addEventListener(
            "click",
            () => {
                jdPdf.click();
            }
        );

        jdPdf.addEventListener(
            "change",
            () => {

                const file =
                    jdPdf.files[0];

                if (!file) {
                    return;
                }

                if (!validatePdfFile(file)) {

                    jdPdf.value = "";

                    showAtsMessage(
                        "Please upload a valid PDF file up to 5 MB.",
                        "error"
                    );

                    return;
                }

                const fileName =
                    document.getElementById(
                        "jdFileName"
                    );

                if (fileName) {

                    fileName.textContent =
                        file.name;

                }

                jdUploadArea.classList.add(
                    "uploaded"
                );

                hideAtsMessage();

            }
        );

    }


    /* -----------------------------------------------------
       ATS Analyze Button
       ----------------------------------------------------- */

    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            async () => {

                const resumeFile =
                    resumePdf?.files?.[0] || null;

                const jdFile =
                    jdPdf?.files?.[0] || null;

                const jdText =
                    jobDescription?.value.trim() || "";


                if (!resumeFile) {

                    showAtsMessage(
                        "Please upload your resume PDF first.",
                        "error"
                    );

                    return;
                }


                if (!jdFile && !jdText) {

                    showAtsMessage(
                        "Please upload a job description PDF or paste the job description.",
                        "error"
                    );

                    return;
                }


                if (jdFile && jdText) {

                    showAtsMessage(
                        "Please use either a JD PDF or pasted job description text.",
                        "error"
                    );

                    return;
                }


                analyzeButton.disabled = true;

                const originalText =
                    analyzeButton.textContent;

                analyzeButton.textContent =
                    "Analyzing...";


                try {

                    const formData =
                        new FormData();

                    formData.append(
                        "resumePdf",
                        resumeFile
                    );


                    if (jdFile) {

                        formData.append(
                            "jdPdf",
                            jdFile
                        );

                    } else {

                        formData.append(
                            "jobDescription",
                            jdText
                        );

                    }


                    const response =
                        await fetch(
                            "/api/ats/analyze",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    if (!response.ok) {
                        throw new Error(
                            "ATS analysis failed."
                        );
                    }


                    const result =
                        await response.json();


                    console.log(
                        "ATS result:",
                        result
                    );


                    displayAtsResult(result);

                    hideAtsMessage();


                } catch (error) {

                    console.error(
                        "ATS analysis error:",
                        error
                    );

                    showAtsMessage(
                        "We could not analyze your resume right now. Please try again.",
                        "error"
                    );

                } finally {

                    analyzeButton.disabled = false;

                    analyzeButton.textContent =
                        originalText;

                }

            }
        );

    }

}


/* =========================================================
   ATS FILE VALIDATION
   ========================================================= */

function validatePdfFile(file) {

    const maxSize =
        5 * 1024 * 1024;

    const isPdf =
        file.type === "application/pdf";

    const validExtension =
        file.name
            .toLowerCase()
            .endsWith(".pdf");

    const validSize =
        file.size <= maxSize;

    return (
        (isPdf || validExtension) &&
        validSize
    );

}


/* =========================================================
   ATS MESSAGE
   ========================================================= */

function showAtsMessage(message, type) {

    const element =
        document.getElementById(
            "atsMessage"
        );

    if (!element) {
        return;
    }

    element.className =
        "ats-message " + type;

    element.textContent =
        message;

}


function hideAtsMessage() {

    const element =
        document.getElementById(
            "atsMessage"
        );

    if (!element) {
        return;
    }

    element.className =
        "ats-message hidden";

    element.textContent =
        "";

}


/* =========================================================
   ATS RESULT
   ========================================================= */

function displayAtsResult(result) {

    const resultContainer =
        document.getElementById(
            "atsResult"
        );

    const scoreElement =
        document.getElementById(
            "atsScore"
        );

    if (!resultContainer) {
        return;
    }


    resultContainer.classList.remove(
        "hidden"
    );


    if (scoreElement) {

        const score =
            result.score ??
            result.matchScore ??
            "--";

        scoreElement.textContent =
            score + "%";

    }


    resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}