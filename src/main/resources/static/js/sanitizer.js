/* =========================================================
   CODE2JOB SANITIZER
   Dedicated JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DOM REFERENCES
       ===================================================== */

    const codeInput =
        document.getElementById("codeInput");

    const codeContext =
        document.getElementById("codeContext");

    const developerGoal =
        document.getElementById("developerGoal");

    const sanitizeButton =
        document.getElementById("sanitizeCode");

    const sanitizerOutput =
        document.getElementById("sanitizerOutput");

    const securityResults =
        document.getElementById("securityResults");

    const performanceResults =
        document.getElementById("performanceResults");

    const resumeStatements =
        document.getElementById("resumeStatements");

    const codeEditor =
        document.getElementById("sanitizerCodeEditor");

    const characterCount =
        document.getElementById("sanitizerCharacterCount");

    const lineNumbers =
        document.getElementById("sanitizerLineNumbers");

    const outputStatus =
        document.getElementById("sanitizerOutputStatus");

    const securityCount =
        document.getElementById("securityCount");

    const performanceCount =
        document.getElementById("performanceCount");

    const resumeCount =
        document.getElementById("resumeCount");


    /* =====================================================
       REQUIRED ELEMENT CHECK
       ===================================================== */

    if (!codeInput || !sanitizeButton) {

        console.error(
            "Code2Job Sanitizer: required elements were not found."
        );

        return;
    }


    /* =====================================================
       CHARACTER COUNTER
       ===================================================== */

    function updateCharacterCount() {

        if (!characterCount) {
            return;
        }

        const count =
            codeInput.value.length;

        characterCount.textContent =
            `${count.toLocaleString()} chars`;
    }


    codeInput.addEventListener(
        "input",
        () => {

            updateCharacterCount();

            updateLineNumbers();
        }
    );

    updateCharacterCount();


    /* =====================================================
       LINE NUMBERS
       ===================================================== */

    function updateLineNumbers() {

        if (!lineNumbers) {
            return;
        }

        const value =
            codeInput.value || "";

        const lineCount =
            Math.max(
                1,
                value.split("\n").length
            );

        let html = "";

        for (
            let index = 1;
            index <= lineCount;
            index++
        ) {

            html += `
                <span>${index}</span>
            `;
        }

        lineNumbers.innerHTML =
            html;
    }


    updateLineNumbers();


    /* =====================================================
       EDITOR SCROLL SYNC
       ===================================================== */

    codeInput.addEventListener(
        "scroll",
        () => {

            if (!lineNumbers) {
                return;
            }

            lineNumbers.scrollTop =
                codeInput.scrollTop;
        }
    );


    /* =====================================================
       TAB SUPPORT
       ===================================================== */

    codeInput.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Tab") {
                return;
            }

            event.preventDefault();

            const start =
                codeInput.selectionStart;

            const end =
                codeInput.selectionEnd;

            const indentation =
                "    ";

            codeInput.value =
                codeInput.value.substring(
                    0,
                    start
                ) +
                indentation +
                codeInput.value.substring(
                    end
                );

            codeInput.selectionStart =
                start + indentation.length;

            codeInput.selectionEnd =
                start + indentation.length;

            updateCharacterCount();
            updateLineNumbers();
        }
    );


    /* =====================================================
       MAIN REVIEW ACTION
       ===================================================== */

    sanitizeButton.addEventListener(
        "click",
        async () => {

            const code =
                codeInput.value.trim();

            const context =
                codeContext
                    ? codeContext.value.trim()
                    : "";

            const goal =
                developerGoal
                    ? developerGoal.value.trim()
                    : "";


            /* =============================================
               CLEAR OLD MESSAGE
               ============================================= */

            removeInlineMessage();


            /* =============================================
               VALIDATION
               ============================================= */

            if (!code) {

                showInlineMessage(
                    "Paste your Java or Spring Boot code before starting the review.",
                    "warning"
                );

                codeInput.focus();

                return;
            }


            if (code.length < 20) {

                showInlineMessage(
                    "Please provide a little more code so the review has useful context.",
                    "warning"
                );

                codeInput.focus();

                return;
            }


            if (code.length > 30000) {

                showInlineMessage(
                    "This code sample is too large. Please submit a smaller section.",
                    "warning"
                );

                return;
            }


            /* =============================================
               PREPARE UI
               ============================================= */

            clearPreviousResults();

            setAnalyzingState(true);


            try {

                /* =========================================
                   API REQUEST
                   ========================================= */

                const response =
                    await fetch(
                        "/api/sanitizer/analyze",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                code: code,
                                context: context,
                                developerGoal: goal
                            })
                        }
                    );


                /* =========================================
                   READ RAW SERVER RESPONSE
                   ========================================= */

                const responseText =
                    await response.text();


                /* =========================================
                   SERVER ERROR
                   ========================================= */

                if (!response.ok) {

                    let errorMessage =
                        "The server could not complete the code review.";


                    if (responseText) {

                        try {

                            const errorData =
                                JSON.parse(
                                    responseText
                                );


                            if (
                                errorData &&
                                typeof errorData.message === "string"
                            ) {

                                errorMessage =
                                    errorData.message;

                            } else if (
                                errorData &&
                                typeof errorData.error === "string"
                            ) {

                                errorMessage =
                                    errorData.error;
                            }

                        } catch (ignored) {

                            /*
                             * Server may have returned HTML
                             * or plain text instead of JSON.
                             */

                            if (
                                !responseText
                                    .trim()
                                    .startsWith("<")
                            ) {

                                errorMessage =
                                    responseText
                                        .trim()
                                        .substring(
                                            0,
                                            500
                                        );
                            }
                        }
                    }


                    throw new Error(
                        errorMessage
                    );
                }


                /* =========================================
                   EMPTY RESPONSE CHECK
                   ========================================= */

                if (
                    !responseText ||
                    !responseText.trim()
                ) {

                    throw new Error(
                        "The server returned an empty review response."
                    );
                }


                /* =========================================
                   PARSE JSON
                   ========================================= */

                let result;


                try {

                    result =
                        JSON.parse(
                            responseText
                        );

                } catch (parseError) {

                    console.error(
                        "Invalid sanitizer API response:",
                        responseText
                    );

                    throw new Error(
                        "The server returned an invalid review response. Please check the sanitizer backend."
                    );
                }


                /* =========================================
                   VALIDATE RESULT
                   ========================================= */

                if (
                    !result ||
                    typeof result !== "object"
                ) {

                    throw new Error(
                        "The review response was not in the expected format."
                    );
                }


                /* =========================================
                   RENDER REVIEW
                   ========================================= */

                renderReview(
                    result
                );


            } catch (error) {

                console.error(
                    "Code2Job sanitizer error:",
                    error
                );


                showInlineMessage(
                    error &&
                    error.message
                        ? error.message
                        : "Something went wrong while reviewing the code.",
                    "error"
                );


            } finally {

                setAnalyzingState(
                    false
                );
            }

        }
    );


    /* =====================================================
       ANALYZING STATE
       ===================================================== */

    function setAnalyzingState(
        isAnalyzing
    ) {

        const buttonText =
            sanitizeButton.querySelector(
                ".sanitizer-button-text"
            );

        const buttonArrow =
            sanitizeButton.querySelector(
                ".sanitizer-button-arrow"
            );


        if (isAnalyzing) {

            /* =============================================
               BUTTON
               ============================================= */

            sanitizeButton.disabled =
                true;

            sanitizeButton.setAttribute(
                "aria-busy",
                "true"
            );


            sanitizeButton.classList.add(
                "is-processing"
            );


            if (buttonText) {

                buttonText.textContent =
                    "Reviewing code...";
            }


            if (buttonArrow) {

                buttonArrow.innerHTML = `
                    <span
                        class="sanitizer-loading-spinner"
                        aria-hidden="true">
                    </span>
                `;
            }


            /* =============================================
               CODE EDITOR GLOW
               ============================================= */

            if (codeEditor) {

                codeEditor.classList.add(
                    "is-analyzing"
                );
            }


            /* =============================================
               STATUS
               ============================================= */

            updateStudioStatus(
                "Analyzing..."
            );


            updateOutputStatus(
                "Analyzing implementation..."
            );


        } else {

            /* =============================================
               BUTTON RESET
               ============================================= */

            sanitizeButton.disabled =
                false;

            sanitizeButton.setAttribute(
                "aria-busy",
                "false"
            );


            sanitizeButton.classList.remove(
                "is-processing"
            );


            if (buttonText) {

                buttonText.textContent =
                    "Review & Sanitize Code";
            }


            if (buttonArrow) {

                buttonArrow.textContent =
                    "→";
            }


            /* =============================================
               REMOVE EDITOR GLOW
               ============================================= */

            if (codeEditor) {

                codeEditor.classList.remove(
                    "is-analyzing"
                );
            }


            /* =============================================
               STATUS
               ============================================= */

            updateStudioStatus(
                "Ready"
            );
        }
    }


    /* =====================================================
       STUDIO STATUS
       ===================================================== */

    function updateStudioStatus(
        status
    ) {

        const statusElement =
            document.querySelector(
                ".sanitizer-live-status"
            );


        if (!statusElement) {
            return;
        }


        statusElement.innerHTML = `
            <span
                class="sanitizer-status-light"
                aria-hidden="true">
            </span>

            ${escapeHtml(status)}
        `;
    }


    /* =====================================================
       OUTPUT STATUS
       ===================================================== */

    function updateOutputStatus(
        status
    ) {

        if (!outputStatus) {
            return;
        }


        outputStatus.textContent =
            status;
    }


    /* =====================================================
       CLEAR PREVIOUS RESULTS
       ===================================================== */

    function clearPreviousResults() {

        if (securityResults) {

            securityResults.innerHTML =
                "";
        }


        if (performanceResults) {

            performanceResults.innerHTML =
                "";
        }


        if (resumeStatements) {

            resumeStatements.innerHTML =
                "";
        }


        resetResultCounters();


        if (sanitizerOutput) {

            sanitizerOutput.classList.add(
                "hidden"
            );

            sanitizerOutput.classList.remove(
                "is-visible"
            );
        }
    }


    /* =====================================================
       RESET RESULT COUNTERS
       ===================================================== */

    function resetResultCounters() {

        if (securityCount) {
            securityCount.textContent = "0";
        }

        if (performanceCount) {
            performanceCount.textContent = "0";
        }

        if (resumeCount) {
            resumeCount.textContent = "0";
        }
    }


    /* =====================================================
       RENDER COMPLETE REVIEW
       ===================================================== */

    function renderReview(
        result
    ) {

        if (!sanitizerOutput) {
            return;
        }


        /*
         * Main response contract:
         *
         * {
         *   securityFindings: [],
         *   performanceFindings: [],
         *   resumeStatements: []
         * }
         *
         * Fallback names are supported so minor
         * backend DTO naming differences do not
         * immediately break the frontend.
         */


        const securityFindings =
            getArrayValue(
                result,
                [
                    "securityFindings",
                    "securityIssues",
                    "securityResults"
                ]
            );


        const performanceFindings =
            getArrayValue(
                result,
                [
                    "performanceFindings",
                    "performanceIssues",
                    "performanceResults"
                ]
            );


        const resumeItems =
            getArrayValue(
                result,
                [
                    "resumeStatements",
                    "resumeBullets",
                    "resumeItems"
                ]
            );


        /* =============================================
           UPDATE COUNTERS
           ============================================= */

        updateResultCounters(
            securityFindings.length,
            performanceFindings.length,
            resumeItems.length
        );


        /* =============================================
           RENDER SECTIONS
           ============================================= */

        renderSecurityFindings(
            securityFindings
        );


        renderPerformanceFindings(
            performanceFindings
        );


        renderResumeStatements(
            resumeItems
        );


        /* =============================================
           SHOW OUTPUT
           ============================================= */

        sanitizerOutput.classList.remove(
            "hidden"
        );


        window.requestAnimationFrame(
            () => {

                sanitizerOutput.classList.add(
                    "is-visible"
                );
            }
        );


        updateOutputStatus(
            "Review complete"
        );


        /* =============================================
           SCROLL TO OUTPUT
           ============================================= */

        window.setTimeout(
            () => {

                sanitizerOutput.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            180
        );
    }


    /* =====================================================
       UPDATE RESULT COUNTERS
       ===================================================== */

    function updateResultCounters(
        security,
        performance,
        resume
    ) {

        if (securityCount) {

            securityCount.textContent =
                String(security);
        }


        if (performanceCount) {

            performanceCount.textContent =
                String(performance);
        }


        if (resumeCount) {

            resumeCount.textContent =
                String(resume);
        }
    }


    /* =====================================================
       GET ARRAY VALUE
       ===================================================== */

    function getArrayValue(
        object,
        possibleKeys
    ) {

        if (
            !object ||
            typeof object !== "object"
        ) {

            return [];
        }


        for (
            const key of possibleKeys
        ) {

            if (
                Array.isArray(
                    object[key]
                )
            ) {

                return object[key];
            }
        }


        return [];
    }


    /* =====================================================
       SECURITY FINDINGS
       ===================================================== */

    function renderSecurityFindings(
        findings
    ) {

        if (!securityResults) {
            return;
        }


        if (
            !Array.isArray(findings) ||
            findings.length === 0
        ) {

            securityResults.innerHTML =
                createEmptyResult(
                    "No obvious security concerns found.",
                    "The submitted implementation did not reveal a clear security concern from the available context."
                );

            return;
        }


        securityResults.innerHTML =
            findings
                .map(
                    (
                        finding,
                        index
                    ) =>
                        createFinding(
                            finding,
                            index + 1
                        )
                )
                .join("");
    }


    /* =====================================================
       PERFORMANCE FINDINGS
       ===================================================== */

    function renderPerformanceFindings(
        findings
    ) {

        if (!performanceResults) {
            return;
        }


        if (
            !Array.isArray(findings) ||
            findings.length === 0
        ) {

            performanceResults.innerHTML =
                createEmptyResult(
                    "No obvious performance concerns found.",
                    "No clear inefficient pattern was identified from the submitted implementation."
                );

            return;
        }


        performanceResults.innerHTML =
            findings
                .map(
                    (
                        finding,
                        index
                    ) =>
                        createFinding(
                            finding,
                            index + 1
                        )
                )
                .join("");
    }


    /* =====================================================
       FINDING CARD
       ===================================================== */

    function createFinding(
        finding,
        index
    ) {

        /* =============================================
           STRING FINDING
           ============================================= */

        if (
            typeof finding === "string"
        ) {

            return `
                <article
                    class="sanitizer-finding">

                    <div
                        class="sanitizer-finding-top">

                        <div
                            class="sanitizer-finding-index">
                            ${index}
                        </div>

                        <div
                            class="sanitizer-finding-main">

                            <h4
                                class="sanitizer-finding-title">
                                Review finding
                            </h4>

                            <p
                                class="sanitizer-finding-text">
                                ${escapeHtml(finding)}
                            </p>

                        </div>

                    </div>

                </article>
            `;
        }


        /* =============================================
           OBJECT FINDING
           ============================================= */

        const safeFinding =
            finding &&
            typeof finding === "object"
                ? finding
                : {};


        const title =
            firstNonEmpty(
                safeFinding.title,
                safeFinding.issue,
                safeFinding.name,
                "Review finding"
            );


        const severity =
            firstNonEmpty(
                safeFinding.severity,
                safeFinding.priority,
                "Review"
            );


        const description =
            firstNonEmpty(
                safeFinding.description,
                safeFinding.explanation,
                safeFinding.whyItMatters,
                ""
            );


        const codeEvidence =
            firstNonEmpty(
                safeFinding.codeEvidence,
                safeFinding.evidence,
                safeFinding.code,
                ""
            );


        const recommendation =
            firstNonEmpty(
                safeFinding.recommendation,
                safeFinding.suggestion,
                safeFinding.suggestedFix,
                safeFinding.fix,
                ""
            );


        const severityClass =
            getSeverityClass(
                severity
            );


        return `
            <article
                class="sanitizer-finding">

                <div
                    class="sanitizer-finding-top">

                    <div
                        class="sanitizer-finding-index">
                        ${index}
                    </div>

                    <div
                        class="sanitizer-finding-main">

                        <div
                            class="sanitizer-finding-heading-row">

                            <h4
                                class="sanitizer-finding-title">
                                ${escapeHtml(title)}
                            </h4>

                            <span
                                class="sanitizer-severity ${escapeHtml(severityClass)}">
                                ${escapeHtml(severity)}
                            </span>

                        </div>

                    </div>

                </div>


                ${
                    description
                        ? `
                            <div
                                class="sanitizer-finding-detail">

                                <span
                                    class="sanitizer-finding-label">
                                    Why it matters
                                </span>

                                <p>
                                    ${escapeHtml(
                                        description
                                    )}
                                </p>

                            </div>
                        `
                        : ""
                }


                ${
                    codeEvidence
                        ? `
                            <div
                                class="sanitizer-finding-detail">

                                <span
                                    class="sanitizer-finding-label">
                                    Code evidence
                                </span>

                                <pre><code>${escapeHtml(
                                    codeEvidence
                                )}</code></pre>

                            </div>
                        `
                        : ""
                }


                ${
                    recommendation
                        ? `
                            <div
                                class="sanitizer-finding-detail">

                                <span
                                    class="sanitizer-finding-label">
                                    Suggested direction
                                </span>

                                <p>
                                    ${escapeHtml(
                                        recommendation
                                    )}
                                </p>

                            </div>
                        `
                        : ""
                }

            </article>
        `;
    }


    /* =====================================================
       SEVERITY CLASS
       ===================================================== */

    function getSeverityClass(
        severity
    ) {

        const value =
            String(
                severity || ""
            )
                .trim()
                .toLowerCase();


        if (
            value.includes("critical") ||
            value.includes("high")
        ) {

            return "high";
        }


        if (
            value.includes("medium") ||
            value.includes("moderate")
        ) {

            return "medium";
        }


        if (
            value.includes("low") ||
            value.includes("minor") ||
            value.includes("info") ||
            value.includes("review")
        ) {

            return "low";
        }


        return value
            .replace(
                /[^a-z0-9_-]/g,
                "-"
            );
    }


    /* =====================================================
       EMPTY RESULT
       ===================================================== */

    function createEmptyResult(
        title,
        description
    ) {

        return `
            <div
                class="sanitizer-empty-result">

                <div
                    class="sanitizer-empty-icon"
                    aria-hidden="true">
                    ✓
                </div>

                <div>

                    <strong>
                        ${escapeHtml(title)}
                    </strong>

                    <p>
                        ${escapeHtml(description)}
                    </p>

                </div>

            </div>
        `;
    }


    /* =====================================================
       RESUME STATEMENTS
       ===================================================== */

    function renderResumeStatements(
        statements
    ) {

        if (!resumeStatements) {
            return;
        }


        if (
            !Array.isArray(statements) ||
            statements.length === 0
        ) {

            resumeStatements.innerHTML =
                createEmptyResult(
                    "No resume statement generated.",
                    "There was not enough implementation evidence to create a reliable resume statement."
                );

            return;
        }


        resumeStatements.innerHTML =
            statements
                .map(
                    (
                        statement,
                        index
                    ) => {

                        let text = "";


                        /* =================================
                           STRING RESPONSE
                           ================================= */

                        if (
                            typeof statement === "string"
                        ) {

                            text =
                                statement.trim();
                        }


                        /* =================================
                           OBJECT RESPONSE
                           ================================= */

                        else if (
                            statement &&
                            typeof statement === "object"
                        ) {

                            text =
                                firstNonEmpty(
                                    statement.text,
                                    statement.bullet,
                                    statement.statement,
                                    statement.content,
                                    ""
                                );
                        }


                        return `
                            <article
                                class="sanitizer-resume-item">

                                <div
                                    class="sanitizer-resume-number">
                                    ${String(
                                        index + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </div>


                                <div
                                    class="sanitizer-resume-content">

                                    <p>
                                        ${escapeHtml(text)}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    class="sanitizer-copy-button"
                                    data-copy="${escapeAttribute(text)}"
                                    aria-label="Copy resume statement">

                                    <span>
                                        Copy
                                    </span>

                                </button>

                            </article>
                        `;
                    }
                )
                .join("");


        attachCopyButtons();
    }


    /* =====================================================
       COPY BUTTONS
       ===================================================== */

    function attachCopyButtons() {

        const buttons =
            document.querySelectorAll(
                ".sanitizer-copy-button"
            );


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const text =
                            button.dataset.copy || "";


                        if (!text) {
                            return;
                        }


                        const label =
                            button.querySelector(
                                "span"
                            );


                        try {

                            await navigator
                                .clipboard
                                .writeText(text);


                            if (label) {

                                label.textContent =
                                    "Copied";
                            } else {

                                button.textContent =
                                    "Copied";
                            }


                            button.classList.add(
                                "copied"
                            );


                            window.setTimeout(
                                () => {

                                    if (label) {

                                        label.textContent =
                                            "Copy";

                                    } else {

                                        button.textContent =
                                            "Copy";
                                    }


                                    button.classList.remove(
                                        "copied"
                                    );

                                },
                                1400
                            );


                        } catch (error) {

                            console.error(
                                "Code2Job copy failed:",
                                error
                            );


                            /*
                             * Fallback for browsers where
                             * navigator.clipboard is blocked.
                             */

                            const copied =
                                fallbackCopy(
                                    text
                                );


                            if (copied) {

                                if (label) {

                                    label.textContent =
                                        "Copied";

                                } else {

                                    button.textContent =
                                        "Copied";
                                }


                                button.classList.add(
                                    "copied"
                                );

                            } else {

                                if (label) {

                                    label.textContent =
                                        "Failed";

                                } else {

                                    button.textContent =
                                        "Failed";
                                }
                            }


                            window.setTimeout(
                                () => {

                                    if (label) {

                                        label.textContent =
                                            "Copy";

                                    } else {

                                        button.textContent =
                                            "Copy";
                                    }


                                    button.classList.remove(
                                        "copied"
                                    );

                                },
                                1400
                            );
                        }

                    }
                );
            }
        );
    }


    /* =====================================================
       CLIPBOARD FALLBACK
       ===================================================== */

    function fallbackCopy(
        text
    ) {

        try {

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";

            textarea.style.top =
                "0";

            textarea.style.opacity =
                "0";

            textarea.style.pointerEvents =
                "none";


            document.body.appendChild(
                textarea
            );


            textarea.focus();

            textarea.select();

            textarea.setSelectionRange(
                0,
                textarea.value.length
            );


            const successful =
                document.execCommand(
                    "copy"
                );


            textarea.remove();


            return successful;

        } catch (error) {

            console.error(
                "Clipboard fallback failed:",
                error
            );

            return false;
        }
    }


    /* =====================================================
       INLINE MESSAGE
       ===================================================== */

    function showInlineMessage(
        message,
        type
    ) {

        removeInlineMessage();


        const element =
            document.createElement(
                "div"
            );


        element.className =
            `sanitizer-inline-message ${type}`;


        element.setAttribute(
            "role",
            type === "error"
                ? "alert"
                : "status"
        );


        /*
         * CSS remains the primary styling source.
         * These variables provide a fallback for the
         * message if sanitizer.css is not loaded.
         */

        element.style.setProperty(
            "--message-border",
            type === "error"
                ? "#d9aaa5"
                : "#dfc594"
        );


        element.style.setProperty(
            "--message-background",
            type === "error"
                ? "#f7e9e7"
                : "#f7efdf"
        );


        element.style.setProperty(
            "--message-color",
            type === "error"
                ? "#7d332b"
                : "#7b541f"
        );


        element.textContent =
            message;


        const studio =
            document.querySelector(
                ".sanitizer-studio"
            );


        if (studio) {

            const referenceNode =
                studio.children.length > 1
                    ? studio.children[1]
                    : null;


            studio.insertBefore(
                element,
                referenceNode
            );

        } else {

            sanitizeButton
                .parentElement
                ?.prepend(element);
        }


        window.setTimeout(
            () => {

                if (element.parentNode) {

                    element.remove();
                }

            },
            6000
        );
    }


    /* =====================================================
       REMOVE INLINE MESSAGE
       ===================================================== */

    function removeInlineMessage() {

        const existing =
            document.querySelector(
                ".sanitizer-inline-message"
            );


        if (existing) {

            existing.remove();
        }
    }


    /* =====================================================
       FIRST NON-EMPTY VALUE
       ===================================================== */

    function firstNonEmpty(
        ...values
    ) {

        for (
            const value of values
        ) {

            if (
                value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
            ) {

                return String(value).trim();
            }
        }


        return "";
    }


    /* =====================================================
       HTML ESCAPING
       ===================================================== */

    function escapeHtml(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";
        }


        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* =====================================================
       ATTRIBUTE ESCAPING
       ===================================================== */

    function escapeAttribute(
        value
    ) {

        return escapeHtml(
            value
        )
            .replace(
                /\n/g,
                "&#10;"
            )
            .replace(
                /\r/g,
                "&#13;"
            );
    }

});