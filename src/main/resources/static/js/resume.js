document.addEventListener("DOMContentLoaded", () => {

 initializeResumeWizard();


/* =========================================================
RESUME WIZARD
========================================================= */


function initializeResumeWizard() {

    const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
        document.getElementById("step4"),
        document.getElementById("step5"),
        document.getElementById("step6")
    ];


    const progressText =
        document.getElementById("progressText");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressBar =
        document.getElementById("progressBar");


    if (!steps[0]) {
        return;
    }


    let isGenerating = false;
    let lastResumeData = null;


    /* =====================================================
       NEXT BUTTONS
       ===================================================== */

    showStep(1, false);
    addOptionalGuidance();


    const nextToCareer =
        document.getElementById("nextToCareer");

    const nextToEducation =
        document.getElementById("nextToEducation");

    const nextToExperience =
        document.getElementById("nextToExperience");

    const nextToProjects =
        document.getElementById("nextToProjects");

    const nextToSkills =
        document.getElementById("nextToSkills");


    if (nextToCareer) {

        nextToCareer.addEventListener(
            "click",
            () => {

                if (validateStep(1)) {
                    showStep(2);
                }

            }
        );

    }


    if (nextToEducation) {

        nextToEducation.addEventListener(
            "click",
            () => {

                if (validateStep(2)) {
                    showStep(3);
                }

            }
        );

    }


    if (nextToExperience) {

        nextToExperience.addEventListener(
            "click",
            () => {

                if (validateStep(3)) {
                    showStep(4);
                }

            }
        );

    }


    if (nextToProjects) {

        nextToProjects.addEventListener(
            "click",
            () => {

                if (validateStep(4)) {
                    showStep(5);
                }

            }
        );

    }


    if (nextToSkills) {

        nextToSkills.addEventListener(
            "click",
            () => {

                if (validateStep(5)) {
                    showStep(6);
                }

            }
        );

    }


    /* =====================================================
       BACK BUTTONS
       ===================================================== */

    const backToPersonal =
        document.getElementById("backToPersonal");

    const backToCareer =
        document.getElementById("backToCareer");

    const backToEducation =
        document.getElementById("backToEducation");

    const backToExperience =
        document.getElementById("backToExperience");

    const backToProjects =
        document.getElementById("backToProjects");


    if (backToPersonal) {

        backToPersonal.addEventListener(
            "click",
            () => {
                showStep(1);
            }
        );

    }


    if (backToCareer) {

        backToCareer.addEventListener(
            "click",
            () => {
                showStep(2);
            }
        );

    }


    if (backToEducation) {

        backToEducation.addEventListener(
            "click",
            () => {
                showStep(3);
            }
        );

    }


    if (backToExperience) {

        backToExperience.addEventListener(
            "click",
            () => {
                showStep(4);
            }
        );

    }


    if (backToProjects) {

        backToProjects.addEventListener(
            "click",
            () => {
                showStep(5);
            }
        );

    }


    /* =====================================================
       GENERATE RESUME
       ===================================================== */

    const generateResume =
        document.getElementById("generateResume");


    if (generateResume) {

        generateResume.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();
                event.stopPropagation();


                if (isGenerating) {
                    return;
                }


                if (!validateStep(6)) {
                    return;
                }


                await generateResumeWithAI(
                    generateResume
                );

            }
        );

    }


    /* =====================================================
       INPUT VALIDATION CLEANUP
       ===================================================== */

    document
        .querySelectorAll(".c2j-input")
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    input.classList.remove(
                        "c2j-invalid-input"
                    );

                }
            );


            input.addEventListener(
                "change",
                () => {

                    input.classList.remove(
                        "c2j-invalid-input"
                    );

                }
            );

        });


    document
        .querySelectorAll(
            'input[name="careerType"]'
        )
        .forEach(radio => {

            radio.addEventListener(
                "change",
                () => {

                    document
                        .querySelectorAll(
                            'input[name="careerType"]'
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "c2j-invalid-input"
                            );

                        });

                }
            );

        });


    /* =====================================================
       STEP DISPLAY
       ===================================================== */

    function showStep(
        stepNumber,
        shouldScroll = true
    ) {

        steps.forEach((step, index) => {

            if (!step) {
                return;
            }


            const currentStepNumber =
                index + 1;


            step.style.display =
                currentStepNumber === stepNumber
                    ? "block"
                    : "none";

        });


        const percentage =
            Math.round(
                (stepNumber / steps.length) * 100
            );


        if (progressText) {

            progressText.textContent =
                `Step ${stepNumber} of ${steps.length}`;

        }


        if (progressPercent) {

            progressPercent.textContent =
                `${percentage}%`;

        }


        if (progressBar) {

            progressBar.style.width =
                `${percentage}%`;

        }


        const activeStep =
            steps[stepNumber - 1];


        if (
            activeStep &&
            shouldScroll
        ) {

            setTimeout(() => {

                activeStep.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                activeStep.classList.remove(
                    "resume-section-highlight"
                );


                void activeStep.offsetWidth;


                activeStep.classList.add(
                    "resume-section-highlight"
                );

            }, 50);

        }

    }


    /* =====================================================
       OPTIONAL GUIDANCE
       ===================================================== */

    function addOptionalGuidance() {

        const guidance = {

            1: {
                title: "Required information",
                text: "Your name, email, phone and location are needed to create the resume. Professional profile links are optional."
            },

            2: {
                title: "Career direction",
                text: "Career type, target role and industry help the AI understand what your resume should focus on. The remaining career context can be skipped."
            },

            3: {
                title: "Optional section",
                text: "You can skip Education and continue. Add it only when it is useful for the application."
            },

            4: {
                title: "Optional section",
                text: "You can skip Experience if you are a fresher or don't have relevant professional experience."
            },

            5: {
                title: "Optional section",
                text: "You can skip Projects completely. Don't create a project just because the form has a project section."
            },

            6: {
                title: "Optional details",
                text: "Skills, certifications, achievements and additional information can all be left blank when they don't apply."
            }

        };


        Object.entries(guidance)
            .forEach(([stepNumber, data]) => {

                const step =
                    steps[
                        Number(stepNumber) - 1
                    ];


                if (!step) {
                    return;
                }


                if (
                    step.querySelector(
                        ".resume-js-guidance"
                    )
                ) {
                    return;
                }


                const box =
                    document.createElement("div");


                box.className =
                    "resume-js-guidance";


                box.style.display = "flex";
                box.style.alignItems = "flex-start";
                box.style.gap = "10px";
                box.style.padding = "11px 13px";
                box.style.marginBottom = "20px";
                box.style.border =
                    "1px solid var(--c2j-line)";
                box.style.background =
                    "#fbfaf7";
                box.style.borderLeft =
                    "3px solid var(--c2j-accent)";
                box.style.fontSize = "12px";
                box.style.lineHeight = "1.55";


                const marker =
                    document.createElement("span");


                marker.textContent =
                    Number(stepNumber) >= 3
                        ? "Optional"
                        : "Info";


                marker.style.flexShrink = "0";
                marker.style.fontWeight = "800";
                marker.style.color =
                    "var(--c2j-accent-dark)";


                const text =
                    document.createElement("span");


                text.textContent =
                    data.text;


                text.style.color =
                    "var(--c2j-muted)";


                box.appendChild(marker);
                box.appendChild(text);


                const featureNumber =
                    step.querySelector(
                        ".c2j-feature-number"
                    );


                if (featureNumber) {

                    featureNumber.after(box);

                } else {

                    step.prepend(box);

                }

            });

    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function validateStep(stepNumber) {

        clearMessages();


        if (stepNumber === 1) {

            const requiredFields = [
                "fullName",
                "email",
                "phone",
                "location"
            ];


            for (
                const fieldId of requiredFields
            ) {

                const field =
                    document.getElementById(fieldId);


                if (!field) {
                    continue;
                }


                if (!field.value.trim()) {

                    showFieldError(
                        field,
                        "Please fill in this field before continuing."
                    );


                    field.focus();


                    return false;

                }

            }


            const email =
                document.getElementById("email");


            if (
                email &&
                !email.checkValidity()
            ) {

                showFieldError(
                    email,
                    "Please enter a valid email address."
                );


                email.focus();


                return false;

            }

        }


        if (stepNumber === 2) {

            const careerType =
                getRadioValue("careerType");


            if (!careerType) {

                showFormMessage(
                    "Please select your career type."
                );


                const firstRadio =
                    document.querySelector(
                        'input[name="careerType"]'
                    );


                if (firstRadio) {
                    firstRadio.focus();
                }


                return false;

            }


            const requiredFields = [
                "targetRole",
                "industry"
            ];


            for (
                const fieldId of requiredFields
            ) {

                const field =
                    document.getElementById(fieldId);


                if (!field) {
                    continue;
                }


                if (!field.value.trim()) {

                    showFieldError(
                        field,
                        "Please fill in this field before continuing."
                    );


                    field.focus();


                    return false;

                }

            }

        }


        return true;

    }


    function showFieldError(
        field,
        message
    ) {

        field.classList.add(
            "c2j-invalid-input"
        );


        showFormMessage(message);

    }


    function showFormMessage(
        message,
        type = "error"
    ) {

        let messageBox =
            document.getElementById(
                "resumeFormMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement("div");


            messageBox.id =
                "resumeFormMessage";


            const form =
                document.getElementById(
                    "resumeForm"
                );


            if (form) {
                form.prepend(messageBox);
            }

        }


        messageBox.className =
            `c2j-form-message ${type}`;


        messageBox.textContent =
            message;


        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    function clearMessages() {

        const messageBox =
            document.getElementById(
                "resumeFormMessage"
            );


        if (messageBox) {
            messageBox.remove();
        }

    }


    function getRadioValue(name) {

        const selected =
            document.querySelector(
                `input[name="${name}"]:checked`
            );


        return selected
            ? selected.value
            : "";

    }


    /* =====================================================
       COLLECT RESUME DATA
       ===================================================== */

    function collectResumeData() {

        return {

            personal: {

                fullName:
                    getValue("fullName"),

                email:
                    getValue("email"),

                phone:
                    getValue("phone"),

                location:
                    getValue("location"),

                linkedin:
                    getValue("linkedin"),

                github:
                    getValue("github"),

                portfolio:
                    getValue("portfolio")

            },


            career: {

                careerType:
                    getRadioValue("careerType"),

                targetRole:
                    getValue("targetRole"),

                industry:
                    getValue("industry"),

                totalExperience:
                    getValue("totalExperience"),

                careerContext:
                    getValue("careerContext")

            },


            education: {

                degree:
                    getValue("degree"),

                institution:
                    getValue("institution"),

                specialization:
                    getValue("specialization"),

                startYear:
                    getValue("educationStartYear"),

                endYear:
                    getValue("educationEndYear"),

                grade:
                    getValue("educationGrade")

            },


            experience: {

                company:
                    getValue("company"),

                jobTitle:
                    getValue("jobTitle"),

                location:
                    getValue("jobLocation"),

                startDate:
                    getValue("jobStartDate"),

                endDate:
                    getValue("jobEndDate"),

                responsibilities:
                    getValue("responsibilities"),

                tools:
                    getValue("experienceTools"),

                results:
                    getValue("experienceResults")

            },


            project: {

                name:
                    getValue("projectName"),

                description:
                    getValue("projectDescription"),

                contribution:
                    getValue("projectContribution"),

                technologies:
                    getValue("projectTechnologies"),

                outcome:
                    getValue("projectOutcome"),

                projectUrl:
                    getValue("projectUrl"),

                githubUrl:
                    getValue("projectGithub")

            },


            skills: {

                technical:
                    getValue("technicalSkills"),

                tools:
                    getValue("toolsSkills"),

                soft:
                    getValue("softSkills"),

                languages:
                    getValue("languages"),

                certifications:
                    getValue("certifications"),

                achievements:
                    getValue("achievements"),

                additionalInformation:
                    getValue(
                        "additionalInformation"
                    )

            }

        };

    }


    function getValue(id) {

        const element =
            document.getElementById(id);


        return element
            ? element.value.trim()
            : "";

    }


    /* =====================================================
       AI GENERATION
       ===================================================== */

    async function generateResumeWithAI(button) {

        if (isGenerating) {
            return;
        }


        isGenerating = true;


        const resumeData =
            collectResumeData();


        lastResumeData =
            resumeData;


        console.log(
            "Sending resume request:",
            resumeData
        );


        const originalText =
            button.textContent;


        clearMessages();


        button.disabled = true;


        const form =
            document.getElementById(
                "resumeForm"
            );


        const builderCard =
            document.getElementById(
                "resumeBuilderCard"
            );


        const existingResult =
            document.getElementById(
                "generatedResume"
            );


        if (existingResult) {
            existingResult.remove();
        }


        const builderContent =
            document.getElementById(
                "resumeBuilderContent"
            );


        if (builderContent) {

            builderContent.style.display =
                "none";

        } else if (form) {

            form.style.display =
                "none";

        }


        const generationState =
            showGenerationState(
                builderCard
            );


        try {

            const response =
                await fetch(
                    "/api/resume/generate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                resumeData
                            )
                    }
                );


            const responseText =
                await response.text();


            console.log(
                "Resume API status:",
                response.status
            );


            console.log(
                "Resume API response:",
                responseText
            );


            if (!response.ok) {

                let message =
                    "Resume generation failed.";


                try {

                    const errorData =
                        JSON.parse(
                            responseText
                        );


                    message =
                        errorData.message ||
                        errorData.error ||
                        message;

                } catch (ignored) {

                    if (responseText) {

                        message =
                            responseText;

                    }

                }


                throw new Error(message);

            }


            if (!responseText.trim()) {

                throw new Error(
                    "Resume API returned an empty response."
                );

            }


            let result;


            try {

                result =
                    JSON.parse(
                        responseText
                    );

            } catch (parseError) {

                console.error(
                    "Failed to parse resume response:",
                    parseError
                );


                throw new Error(
                    "Resume API returned an invalid JSON response."
                );

            }


            console.log(
                "Generated resume:",
                result
            );


            await generationState.complete();


            generationState.remove();


            if (builderContent) {

                builderContent.style.display =
                    "block";

            } else if (form) {

                form.style.display =
                    "block";

            }


            displayGeneratedResume(
                result,
                lastResumeData
            );

        } catch (error) {

            console.error(
                "Resume generation error:",
                error
            );


            generationState.fail();


            await wait(500);


            generationState.remove();


            if (builderContent) {

                builderContent.style.display =
                    "block";

            } else if (form) {

                form.style.display =
                    "block";

            }


            showFormMessage(
                error.message ||
                    "Unable to generate resume.",
                "error"
            );

        } finally {

            isGenerating = false;


            button.disabled = false;


            button.textContent =
                originalText;

        }

    }


    /* =====================================================
       GENERATION UI
       ===================================================== */

    function showGenerationState(
        container
    ) {

        ensureGenerationStyles();


        const panel =
            document.createElement("div");


        panel.className =
            "c2j-generation-panel";


        panel.id =
            "resumeGenerationPanel";


        const kicker =
            document.createElement("div");


        kicker.className =
            "c2j-generation-kicker";


        kicker.textContent =
            "Code2Job AI Resume Builder";


        const title =
            document.createElement("h2");


        title.className =
            "c2j-generation-title";


        title.textContent =
            "We're building your resume";


        const description =
            document.createElement("p");


        description.className =
            "c2j-generation-description";


        description.textContent =
            "Your information is being organized and rewritten into a clean, ATS-friendly resume. This can take a little while while the AI prepares your content.";


        const loader =
            document.createElement("div");


        loader.className =
            "c2j-generation-loader";


        const stage =
            document.createElement("div");


        stage.className =
            "c2j-generation-stage";


        stage.textContent =
            "Reading your career details";


        const progress =
            document.createElement("div");


        progress.className =
            "c2j-generation-progress";


        const progressBar =
            document.createElement("div");


        progressBar.className =
            "c2j-generation-progress-bar";


        progress.appendChild(
            progressBar
        );


        const percent =
            document.createElement("div");


        percent.className =
            "c2j-generation-percent";


        percent.textContent =
            "10%";


        const note =
            document.createElement("div");


        note.className =
            "c2j-generation-note";


        note.textContent =
            "Please keep this page open while your resume is being prepared.";


        panel.appendChild(kicker);
        panel.appendChild(title);
        panel.appendChild(description);
        panel.appendChild(loader);
        panel.appendChild(stage);
        panel.appendChild(progress);
        panel.appendChild(percent);
        panel.appendChild(note);


        if (container) {

            container.appendChild(panel);

        } else {

            document.body.appendChild(panel);

        }


        setTimeout(() => {

            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 50);


        const stages = [

            {
                text: "Reading your career details",
                progress: 10
            },

            {
                text: "Organizing your experience",
                progress: 27
            },

            {
                text: "Writing your professional summary",
                progress: 45
            },

            {
                text: "Structuring your ATS-friendly resume",
                progress: 65
            },

            {
                text: "Polishing your projects and skills",
                progress: 82
            },

            {
                text: "Finalizing your resume",
                progress: 92
            }

        ];


        let currentStage = 0;


        const interval =
            setInterval(
                () => {

                    currentStage =
                        Math.min(
                            currentStage + 1,
                            stages.length - 1
                        );


                    const current =
                        stages[currentStage];


                    stage.style.opacity =
                        "0";


                    setTimeout(() => {

                        stage.textContent =
                            current.text;


                        stage.style.opacity =
                            "1";

                    }, 120);


                    progressBar.style.width =
                        `${current.progress}%`;


                    percent.textContent =
                        `${current.progress}%`;

                },
                1900
            );


        return {

            async complete() {

                clearInterval(interval);


                stage.style.opacity =
                    "0";


                await wait(160);


                stage.textContent =
                    "Resume complete. Preparing your preview...";


                stage.style.opacity =
                    "1";


                progressBar.style.width =
                    "100%";


                percent.textContent =
                    "100%";


                await wait(650);

            },


            fail() {

                clearInterval(interval);


                stage.textContent =
                    "Something went wrong. You can try again.";

            },


            remove() {

                clearInterval(interval);


                if (panel) {
                    panel.remove();
                }

            }

        };

    }


    function ensureGenerationStyles() {

        if (
            document.getElementById(
                "c2j-generation-runtime-style"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "c2j-generation-runtime-style";


        style.textContent = `
            .c2j-generation-stage {
                transition:
                    opacity 0.2s ease,
                    transform 0.2s ease;
            }
        `;


        document.head.appendChild(style);

    }


    function wait(milliseconds) {

        return new Promise(resolve => {

            setTimeout(
                resolve,
                milliseconds
            );

        });

    }


    /* =====================================================
       GENERATED RESUME PREVIEW
       ===================================================== */

    function displayGeneratedResume(
        result,
        resumeData
    ) {

        console.log(
            "Displaying generated resume:",
            result
        );


        const oldResult =
            document.getElementById(
                "generatedResume"
            );


        if (oldResult) {
            oldResult.remove();
        }


        const builderCard =
            document.getElementById(
                "resumeBuilderCard"
            );


        if (!builderCard) {

            console.error(
                "resumeBuilderCard not found."
            );


            return;
        }


        const builderLayout =
            builderCard.closest(
                ".resume-builder-layout"
            ) ||
            builderCard.parentElement;


        const resultBox =
            document.createElement("section");


        resultBox.id =
            "generatedResume";


        resultBox.className =
            "generated-resume-page";


        const toolbar =
            document.createElement("div");


        toolbar.className =
            "generated-resume-toolbar";


        const toolbarText =
            document.createElement("div");


        const toolbarKicker =
            document.createElement("div");


        toolbarKicker.className =
            "generated-resume-toolbar-kicker";


        toolbarKicker.textContent =
            "Resume Preview";


        const toolbarTitle =
            document.createElement("h2");


        toolbarTitle.className =
            "generated-resume-toolbar-title";


        toolbarTitle.textContent =
            "Your resume is ready";


        const toolbarDescription =
            document.createElement("p");


        toolbarDescription.className =
            "generated-resume-toolbar-description";


        toolbarDescription.textContent =
            "Review the content below. You can go back and edit your information before finalizing the resume.";


        toolbarText.appendChild(
            toolbarKicker
        );


        toolbarText.appendChild(
            toolbarTitle
        );


        toolbarText.appendChild(
            toolbarDescription
        );


        const toolbarActions =
            document.createElement("div");


        toolbarActions.className =
            "generated-resume-toolbar-actions";


        const editButton =
            document.createElement("button");


        editButton.type =
            "button";


        editButton.className =
            "c2j-secondary-btn";


        editButton.textContent =
            "Edit Resume";


        editButton.addEventListener(
            "click",
            () => {

                resultBox.remove();


                const builderContent =
                    document.getElementById(
                        "resumeBuilderContent"
                    );


                if (builderContent) {

                    builderContent.style.display =
                        "block";

                }


                if (builderCard) {

                    builderCard.style.display =
                        "block";

                }


                const resumeForm =
                    document.getElementById(
                        "resumeForm"
                    );


                if (
                    resumeForm &&
                    !builderContent
                ) {

                    resumeForm.style.display =
                        "block";

                }


                builderCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );


        const printButton =
            document.createElement("button");


        printButton.type =
            "button";


        printButton.className =
            "c2j-primary-btn";


        printButton.textContent =
            "Print / Save PDF";


        printButton.addEventListener(
            "click",
            () => {

                window.print();

            }
        );


        toolbarActions.appendChild(
            editButton
        );


        toolbarActions.appendChild(
            printButton
        );


        toolbar.appendChild(
            toolbarText
        );


        toolbar.appendChild(
            toolbarActions
        );


        resultBox.appendChild(
            toolbar
        );


        const resumePaper =
            document.createElement("article");


        resumePaper.className =
            "generated-resume-paper";


        renderResumeHeader(
            resumePaper,
            resumeData
        );


        renderGeneratedSummary(
            resumePaper,
            result
        );


        renderExperience(
            resumePaper,
            result,
            resumeData
        );


        renderProject(
            resumePaper,
            result,
            resumeData
        );


        renderTechnicalSkills(
            resumePaper,
            result,
            resumeData
        );


        renderSoftSkills(
            resumePaper,
            result,
            resumeData
        );


        renderEducation(
            resumePaper,
            resumeData
        );


        renderLanguages(
            resumePaper,
            result,
            resumeData
        );


        renderCertifications(
            resumePaper,
            result,
            resumeData
        );


        renderAchievements(
            resumePaper,
            result,
            resumeData
        );


        renderAdditionalInformation(
            resumePaper,
            result,
            resumeData
        );


        resultBox.appendChild(
            resumePaper
        );


        if (builderLayout) {

            builderLayout.after(
                resultBox
            );

        } else {

            builderCard.after(
                resultBox
            );

        }


        if (builderLayout) {

            builderLayout.style.display =
                "none";

        } else {

            builderCard.style.display =
                "none";

        }


        setTimeout(() => {

            resultBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =====================================================
       RESUME HEADER
       ===================================================== */

    function renderResumeHeader(
        container,
        resumeData
    ) {

        const personal =
            resumeData?.personal || {};


        const header =
            document.createElement("header");


        header.className =
            "generated-resume-header";


        const name =
            document.createElement("h1");


        name.textContent =
            personal.fullName ||
            "Your Name";


        const contact =
            document.createElement("div");


        contact.className =
            "generated-resume-contact";


        addContactText(
            contact,
            personal.email
        );


        addContactText(
            contact,
            personal.phone
        );


        addContactText(
            contact,
            personal.location
        );


        addContactLink(
            contact,
            personal.linkedin,
            "LinkedIn"
        );


        addContactLink(
            contact,
            personal.github,
            "GitHub"
        );


        addContactLink(
            contact,
            personal.portfolio,
            "Portfolio"
        );


        header.appendChild(name);
        header.appendChild(contact);


        container.appendChild(
            header
        );

    }


    function addContactText(
        container,
        value
    ) {

        if (!value) {
            return;
        }


        const span =
            document.createElement("span");


        span.textContent =
            value;


        container.appendChild(
            span
        );

    }


    function addContactLink(
        container,
        value,
        label
    ) {

        if (!value) {
            return;
        }


        const safeUrl =
            normalizeUrl(value);


        if (!safeUrl) {

            addContactText(
                container,
                value
            );


            return;
        }


        const link =
            document.createElement("a");


        link.href =
            safeUrl;


        link.target =
            "_blank";


        link.rel =
            "noopener noreferrer";


        link.textContent =
            label;


        container.appendChild(
            link
        );

    }


    function normalizeUrl(
        value
    ) {

        const trimmed =
            String(value || "").trim();


        if (!trimmed) {
            return "";
        }


        if (
            trimmed.startsWith("https://") ||
            trimmed.startsWith("http://")
        ) {

            return trimmed;

        }


        return "";

    }


    /* =====================================================
       PROFESSIONAL SUMMARY
       ===================================================== */

    function renderGeneratedSummary(
        container,
        result
    ) {

        createSection(
            container,
            "Professional Summary",
            result?.professionalSummary
        );

    }


    /* =====================================================
       EXPERIENCE
       ===================================================== */

    function renderExperience(
        container,
        result,
        resumeData
    ) {

        const bullets =
            cleanArray(
                result?.experienceBullets
            );


        const experience =
            resumeData?.experience || {};


        const hasExperience =
            bullets.length > 0 ||
            experience.company ||
            experience.jobTitle ||
            experience.responsibilities ||
            experience.tools ||
            experience.results;


        if (!hasExperience) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                "Experience"
            );


        if (
            experience.jobTitle ||
            experience.company
        ) {

            const heading =
                document.createElement("div");


            heading.className =
                "generated-resume-entry-title";


            heading.textContent =
                [
                    experience.jobTitle,
                    experience.company
                ]
                    .filter(Boolean)
                    .join(" — ");


            section.appendChild(
                heading
            );


            const meta =
                [
                    experience.location,
                    buildDateRange(
                        experience.startDate,
                        experience.endDate
                    )
                ]
                    .filter(Boolean)
                    .join(" • ");


            if (meta) {

                const metaElement =
                    document.createElement("div");


                metaElement.className =
                    "generated-resume-entry-meta";


                metaElement.textContent =
                    meta;


                section.appendChild(
                    metaElement
                );

            }

        }


        if (bullets.length > 0) {

            appendBulletList(
                section,
                bullets
            );

        }


        if (bullets.length === 0) {

            const fallbackFacts = [];


            if (experience.responsibilities) {

                fallbackFacts.push(
                    experience.responsibilities
                );

            }


            if (experience.tools) {

                fallbackFacts.push(
                    `Tools & Technologies: ${experience.tools}`
                );

            }


            if (experience.results) {

                fallbackFacts.push(
                    experience.results
                );

            }


            appendBulletList(
                section,
                fallbackFacts
            );

        }

    }


    function buildDateRange(
        startDate,
        endDate
    ) {

        if (
            startDate &&
            endDate
        ) {

            return `${startDate} – ${endDate}`;

        }


        return startDate ||
            endDate ||
            "";

    }


    /* =====================================================
       PROJECT
       ===================================================== */

    function renderProject(
        container,
        result,
        resumeData
    ) {

        const project =
            resumeData?.project || {};


        let bullets =
            cleanArray(
                result?.projectBullets
            );


        if (bullets.length === 0) {

            bullets =
                textToBullets(
                    result?.projectDescription
                );

        }


        if (bullets.length === 0) {

            bullets =
                buildProjectFallbackBullets(
                    project
                );

        }


        const hasProject =
            project.name ||
            bullets.length > 0 ||
            project.description ||
            project.contribution ||
            project.technologies ||
            project.outcome;


        if (!hasProject) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                "Projects"
            );


        if (project.name) {

            const projectName =
                document.createElement("div");


            projectName.className =
                "generated-resume-entry-title";


            projectName.textContent =
                project.name;


            section.appendChild(
                projectName
            );

        }


        if (bullets.length > 0) {

            appendBulletList(
                section,
                bullets
            );

        }


        if (project.technologies) {

            const technologies =
                document.createElement("div");


            technologies.className =
                "generated-resume-inline-fact";


            technologies.textContent =
                `Technologies: ${project.technologies}`;


            section.appendChild(
                technologies
            );

        }


        const projectLinks = [

            {
                label: "Live Project",
                value: project.projectUrl
            },

            {
                label: "Repository",
                value: project.githubUrl
            }

        ];


        const linkContainer =
            document.createElement("div");


        linkContainer.className =
            "generated-resume-links";


        let hasLinks = false;


        projectLinks.forEach(item => {

            const safeUrl =
                normalizeUrl(
                    item.value
                );


            if (!safeUrl) {
                return;
            }


            hasLinks = true;


            const link =
                document.createElement("a");


            link.href =
                safeUrl;


            link.target =
                "_blank";


            link.rel =
                "noopener noreferrer";


            link.textContent =
                item.label;


            linkContainer.appendChild(
                link
            );

        });


        if (hasLinks) {

            section.appendChild(
                linkContainer
            );

        }

    }


    function buildProjectFallbackBullets(
        project
    ) {

        const bullets = [];


        if (project.description) {

            bullets.push(
                project.description
            );

        }


        if (project.contribution) {

            bullets.push(
                project.contribution
            );

        }


        if (project.outcome) {

            bullets.push(
                project.outcome
            );

        }


        return bullets;

    }


    /* =====================================================
       TECHNICAL SKILLS
       ===================================================== */

    function renderTechnicalSkills(
        container,
        result,
        resumeData
    ) {

        const generatedCategories =
            result?.technicalSkillCategories;


        const generatedSkills =
            result?.technicalSkills;


        const rawTechnical =
            resumeData?.skills?.technical;


        const rawTools =
            resumeData?.skills?.tools;


        const categories = [];


        if (
            Array.isArray(
                generatedCategories
            )
        ) {

            generatedCategories.forEach(
                category => {

                    if (!category) {
                        return;
                    }


                    if (
                        typeof category ===
                        "object" &&
                        !Array.isArray(category)
                    ) {

                        const categoryName =
                            category.category ||
                            category.name ||
                            "";


                        const skills =
                            normalizeSkillValue(
                                category.skills
                            );


                        if (
                            categoryName &&
                            skills
                        ) {

                            categories.push({
                                category:
                                    categoryName,
                                skills:
                                    skills
                            });

                        }


                        return;

                    }


                    const value =
                        String(category).trim();


                    if (value) {

                        categories.push(
                            parseSkillLine(
                                value
                            )
                        );

                    }

                }
            );

        }


        if (categories.length === 0) {

            const skills =
                Array.isArray(
                    generatedSkills
                )
                    ? generatedSkills
                    : generatedSkills
                        ? [generatedSkills]
                        : [];


            skills.forEach(item => {

                const parsed =
                    parseSkillItem(
                        item
                    );


                if (parsed) {

                    categories.push(
                        parsed
                    );

                }

            });

        }


        if (
            categories.length === 0 &&
            (
                rawTechnical ||
                rawTools
            )
        ) {

            if (rawTechnical) {

                categories.push({
                    category:
                        "Technical Skills",
                    skills:
                        rawTechnical
                });

            }


            if (rawTools) {

                categories.push({
                    category:
                        "Tools",
                    skills:
                        rawTools
                });

            }

        }


        if (categories.length === 0) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                "Technical Skills"
            );


        const normalizedCategories =
            mergeSkillCategories(
                categories
            );


        normalizedCategories.forEach(
            item => {

                appendSkillRow(
                    section,
                    item.category,
                    item.skills
                );

            }
        );

    }


    function parseSkillItem(
        item
    ) {

        if (
            item === null ||
            item === undefined
        ) {

            return null;

        }


        if (
            typeof item === "object" &&
            !Array.isArray(item)
        ) {

            const category =
                item.category ||
                item.name ||
                "Technical Skills";


            const skills =
                normalizeSkillValue(
                    item.skills ||
                    item.values ||
                    item.items
                );


            if (!skills) {
                return null;
            }


            return {
                category:
                    category,
                skills:
                    skills
            };

        }


        const value =
            String(item).trim();


        if (!value) {
            return null;
        }


        return parseSkillLine(
            value
        );

    }


    function parseSkillLine(
        value
    ) {

        const separatorIndex =
            value.indexOf(":");


        if (separatorIndex > 0) {

            return {

                category:
                    value
                        .slice(
                            0,
                            separatorIndex
                        )
                        .trim(),

                skills:
                    value
                        .slice(
                            separatorIndex + 1
                        )
                        .trim()

            };

        }


        return {

            category:
                "Technical Skills",

            skills:
                value

        };

    }


    function normalizeSkillValue(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        if (Array.isArray(value)) {

            return value
                .map(
                    item =>
                        String(item).trim()
                )
                .filter(Boolean)
                .join(", ");

        }


        return String(value).trim();

    }


    function mergeSkillCategories(
        categories
    ) {

        const map =
            new Map();


        categories.forEach(item => {

            if (
                !item ||
                !item.skills
            ) {

                return;

            }


            const category =
                String(
                    item.category ||
                    "Technical Skills"
                ).trim();


            const skills =
                String(
                    item.skills
                ).trim();


            if (!skills) {
                return;
            }


            if (!map.has(category)) {

                map.set(
                    category,
                    []
                );

            }


            map.get(category).push(
                skills
            );

        });


        return Array
            .from(map.entries())
            .map(
                ([category, skills]) => ({

                    category,

                    skills:
                        skills.join(", ")

                })
            );

    }


    function appendSkillRow(
        container,
        category,
        skills
    ) {

        if (!skills) {
            return;
        }


        const row =
            document.createElement("div");


        row.className =
            "generated-resume-skill-row";


        if (category) {

            const label =
                document.createElement("strong");


            label.textContent =
                `${category}: `;


            row.appendChild(
                label
            );

        }


        const text =
            document.createElement("span");


        text.textContent =
            skills;


        row.appendChild(
            text
        );


        container.appendChild(
            row
        );

    }


    /* =====================================================
       SOFT SKILLS
       ===================================================== */

    function renderSoftSkills(
        container,
        result,
        resumeData
    ) {

        const generated =
            normalizeList(
                result?.softSkills
            );


        const raw =
            splitUserList(
                resumeData?.skills?.soft
            );


        const skills =
            generated.length > 0
                ? generated
                : raw;


        if (skills.length === 0) {
            return;
        }


        createBulletSection(
            container,
            "Soft Skills",
            skills
        );

    }


    /* =====================================================
       EDUCATION
       ===================================================== */

    function renderEducation(
        container,
        resumeData
    ) {

        const education =
            resumeData?.education || {};


        const hasEducation =
            education.degree ||
            education.institution ||
            education.specialization ||
            education.startYear ||
            education.endYear ||
            education.grade;


        if (!hasEducation) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                "Education"
            );


        if (education.degree) {

            const degree =
                document.createElement("div");


            degree.className =
                "generated-resume-entry-title";


            degree.textContent =
                education.degree;


            section.appendChild(
                degree
            );

        }


        if (education.institution) {

            const institution =
                document.createElement("div");


            institution.className =
                "generated-resume-entry-institution";


            institution.textContent =
                education.institution;


            section.appendChild(
                institution
            );

        }


        const educationMeta =
            [
                education.specialization,
                buildDateRange(
                    education.startYear,
                    education.endYear
                ),
                education.grade
            ]
                .filter(Boolean)
                .join(" • ");


        if (educationMeta) {

            const meta =
                document.createElement("div");


            meta.className =
                "generated-resume-entry-meta";


            meta.textContent =
                educationMeta;


            section.appendChild(
                meta
            );

        }

    }


    /* =====================================================
       LANGUAGES
       ===================================================== */

    function renderLanguages(
        container,
        result,
        resumeData
    ) {

        const generated =
            normalizeList(
                result?.languages
            );


        const raw =
            splitUserList(
                resumeData?.skills?.languages
            );


        const languages =
            generated.length > 0
                ? generated
                : raw;


        if (languages.length === 0) {
            return;
        }


        createBulletSection(
            container,
            "Languages",
            languages
        );

    }


    /* =====================================================
       CERTIFICATIONS
       ===================================================== */

    function renderCertifications(
        container,
        result,
        resumeData
    ) {

        const generated =
            normalizeList(
                result?.certifications
            );


        const raw =
            splitUserList(
                resumeData?.skills?.certifications
            );


        const certifications =
            generated.length > 0
                ? generated
                : raw;


        if (certifications.length === 0) {
            return;
        }


        createBulletSection(
            container,
            "Certifications",
            certifications
        );

    }


    /* =====================================================
       ACHIEVEMENTS
       ===================================================== */

    function renderAchievements(
        container,
        result,
        resumeData
    ) {

        const generated =
            normalizeList(
                result?.achievements
            );


        const raw =
            splitUserList(
                resumeData?.skills?.achievements
            );


        const achievements =
            generated.length > 0
                ? generated
                : raw;


        if (achievements.length === 0) {
            return;
        }


        createBulletSection(
            container,
            "Achievements",
            achievements
        );

    }


    /* =====================================================
       ADDITIONAL INFORMATION
       ===================================================== */

    function renderAdditionalInformation(
        container,
        result,
        resumeData
    ) {

        const generated =
            result?.additionalInformation;


        const raw =
            resumeData?.skills
                ?.additionalInformation;


        const value =
            String(
                generated ||
                raw ||
                ""
            ).trim();


        if (!value) {
            return;
        }


        createSection(
            container,
            "Additional Information",
            value
        );

    }


    /* =====================================================
       GENERIC PREVIEW HELPERS
       ===================================================== */

    function createSection(
        container,
        title,
        content
    ) {

        if (
            content === null ||
            content === undefined
        ) {

            return;

        }


        if (Array.isArray(content)) {

            const clean =
                cleanArray(content);


            if (clean.length === 0) {
                return;
            }


            createBulletSection(
                container,
                title,
                clean
            );


            return;

        }


        const value =
            String(content).trim();


        if (!value) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                title
            );


        const paragraph =
            document.createElement("p");


        paragraph.className =
            "generated-resume-paragraph";


        paragraph.textContent =
            value;


        section.appendChild(
            paragraph
        );

    }


    function createBulletSection(
        container,
        title,
        items
    ) {

        const clean =
            normalizeList(
                items
            );


        if (clean.length === 0) {
            return;
        }


        const section =
            createPreviewSection(
                container,
                title
            );


        appendBulletList(
            section,
            clean
        );

    }


    function createPreviewSection(
        container,
        title
    ) {

        const section =
            document.createElement("section");


        section.className =
            "generated-resume-section";


        const heading =
            document.createElement("h2");


        heading.textContent =
            title;


        section.appendChild(
            heading
        );


        container.appendChild(
            section
        );


        return section;

    }


    function appendBulletList(
        container,
        items
    ) {

        const clean =
            normalizeList(
                items
            );


        if (clean.length === 0) {
            return;
        }


        const list =
            document.createElement("ul");


        list.className =
            "generated-resume-bullet-list";


        clean.forEach(item => {

            const listItem =
                document.createElement("li");


            listItem.textContent =
                item;


            list.appendChild(
                listItem
            );

        });


        container.appendChild(
            list
        );

    }


    function normalizeList(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return [];

        }


        if (Array.isArray(value)) {

            return value
                .filter(
                    item =>
                        item !== null &&
                        item !== undefined
                )
                .flatMap(item => {

                    if (
                        typeof item ===
                        "string"
                    ) {

                        return splitUserList(
                            item
                        );

                    }


                    if (
                        typeof item ===
                        "object"
                    ) {

                        const text =
                            item.text ||
                            item.name ||
                            item.value ||
                            item.skill ||
                            "";


                        return text
                            ? [String(text).trim()]
                            : [];

                    }


                    return [
                        String(item).trim()
                    ];

                })
                .filter(Boolean);

        }


        return splitUserList(
            String(value)
        );

    }


    function splitUserList(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return [];

        }


        const text =
            String(value).trim();


        if (!text) {
            return [];
        }


        const lines =
            text
                .split(/\r?\n/)
                .map(
                    line =>
                        line
                            .replace(
                                /^[-•*]\s*/,
                                ""
                            )
                            .trim()
                )
                .filter(Boolean);


        if (lines.length > 1) {
            return lines;
        }


        if (text.includes(";")) {

            return text
                .split(";")
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);

        }


        return [text];

    }


    function cleanArray(
        value
    ) {

        return normalizeList(
            value
        );

    }


    function textToBullets(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return [];

        }


        const text =
            String(value).trim();


        if (!text) {
            return [];
        }


        const lines =
            text
                .split(/\r?\n/)
                .map(
                    line =>
                        line
                            .replace(
                                /^[-•*]\s*/,
                                ""
                            )
                            .trim()
                )
                .filter(Boolean);


        if (lines.length > 1) {
            return lines;
        }


        return [text];

    }


    console.log(
        "Code2Job Resume Wizard initialized."
    );

}


initializeResumeWizard();

});