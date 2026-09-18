document.addEventListener("DOMContentLoaded", () => {

initializeResumeScript();
initializeATS();


/* =========================================================
   RESUME SCRIPT LOADER
   ========================================================= */

function initializeResumeScript() {

    const isResumePage =
        document.body &&
        document.body.dataset.page === "resume";

    if (!isResumePage) {
        return;
    }

    if (
        document.querySelector(
            'script[data-resume-script="true"]'
        )
    ) {
        return;
    }

    const script =
        document.createElement("script");

    script.src = "/js/resume.js";
    script.dataset.resumeScript = "true";

    document.body.appendChild(script);
}


/* =========================================================
   ATS
   ========================================================= */

function initializeATS() {

    const resumeFileInput =
        document.getElementById(
            "resumeFile"
        );

    const jobDescriptionFileInput =
        document.getElementById(
            "jobDescriptionFile"
        );

    const resumeUploadBox =
        document.getElementById(
            "resumeUploadBox"
        );

    const jobDescriptionUploadBox =
        document.getElementById(
            "jobDescriptionUploadBox"
        );


    if (
        !resumeFileInput &&
        !jobDescriptionFileInput
    ) {
        return;
    }


    if (
        resumeUploadBox &&
        resumeFileInput
    ) {

        resumeUploadBox.addEventListener(
            "click",
            () => {
                resumeFileInput.click();
            }
        );


        resumeFileInput.addEventListener(
            "change",
            () => {

                if (
                    resumeFileInput.files.length > 0
                ) {

                    updateUploadBox(
                        resumeUploadBox,
                        resumeFileInput.files[0]
                    );

                }

            }
        );

    }


    if (
        jobDescriptionUploadBox &&
        jobDescriptionFileInput
    ) {

        jobDescriptionUploadBox.addEventListener(
            "click",
            () => {
                jobDescriptionFileInput.click();
            }
        );


        jobDescriptionFileInput.addEventListener(
            "change",
            () => {

                if (
                    jobDescriptionFileInput
                        .files
                        .length > 0
                ) {

                    updateUploadBox(
                        jobDescriptionUploadBox,
                        jobDescriptionFileInput.files[0]
                    );

                }

            }
        );

    }


    const analyzeButton =
        document.getElementById(
            "analyzeATS"
        );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            async () => {

                const resumeFile =
                    resumeFileInput
                        ?.files
                        ?.[0];

                const jobDescriptionFile =
                    jobDescriptionFileInput
                        ?.files
                        ?.[0];


                if (
                    !resumeFile ||
                    !jobDescriptionFile
                ) {

                    showATSMessage(
                        "Please upload both your resume and job description."
                    );

                    return;
                }


                await analyzeATS(
                    analyzeButton,
                    resumeFile,
                    jobDescriptionFile
                );

            }
        );

    }

}


function updateUploadBox(
    box,
    file
) {

    box.classList.add(
        "uploaded"
    );


    const fileName =
        box.querySelector(
            ".ats-file-name"
        );


    if (fileName) {

        fileName.textContent =
            file.name;

    }

}


async function analyzeATS(
    button,
    resumeFile,
    jobDescriptionFile
) {

    const originalText =
        button.textContent;


    button.disabled = true;

    button.textContent =
        "Analyzing...";


    try {

        const formData =
            new FormData();


        formData.append(
            "resume",
            resumeFile
        );


        formData.append(
            "jobDescription",
            jobDescriptionFile
        );


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
                "Unable to analyze the resume."
            );

        }


        const result =
            await response.json();


        displayATSResult(
            result
        );

    } catch (error) {

        console.error(
            "ATS analysis failed:",
            error
        );


        showATSMessage(
            error.message ||
                "Something went wrong while analyzing the resume."
        );

    } finally {

        button.disabled = false;

        button.textContent =
            originalText;

    }

}


function displayATSResult(
    result
) {

    const resultBox =
        document.getElementById(
            "atsResult"
        );


    if (!resultBox) {
        return;
    }


    resultBox.style.display =
        "block";


    resultBox.innerHTML = `
        <div class="c2j-card" style="padding:28px;">
            <h2 style="margin-top:0;">ATS Analysis</h2>

            <pre style="
                white-space:pre-wrap;
                line-height:1.7;
                font-family:inherit;
            ">${escapeHtml(
                result.analysis ||
                result.message ||
                JSON.stringify(
                    result,
                    null,
                    2
                )
            )}</pre>
        </div>
    `;


    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function showATSMessage(
    message
) {

    let messageBox =
        document.getElementById(
            "atsMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.id =
            "atsMessage";

        messageBox.className =
            "ats-message error";


        const atsSection =
            document.querySelector(
                ".ats-result"
            ) ||
            document.body;


        atsSection.prepend(
            messageBox
        );

    }


    messageBox.textContent =
        message;

}


function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}

});