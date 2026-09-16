# Code2Job

<div align="center">

### AI-Powered Career Toolkit for Smarter Job Applications

**Build better resumes. Understand your ATS match. Improve your code. Move closer to the job you want.**

[![Java](https://img.shields.io/badge/Java-25-orange?style=for-the-badge\&logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-brightgreen?style=for-the-badge\&logo=springboot)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-2.x-blue?style=for-the-badge\&logo=spring)](https://spring.io/projects/spring-ai)
[![Thymeleaf](https://img.shields.io/badge/Thymeleaf-Server%20Side-green?style=for-the-badge\&logo=thymeleaf)](https://www.thymeleaf.org/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange?style=for-the-badge\&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#license)

<br>

> **From raw experience to professional career output — powered by AI.**

<br>

[Features](#-features) •
[Architecture](#-architecture) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[API](#-api-endpoints) •
[Roadmap](#-roadmap)

</div>

---

## ⚡ What is Code2Job?

**Code2Job** is an AI-powered career toolkit built with **Java, Spring Boot, Spring AI, Thymeleaf and Google Gemini**.

The idea is simple:

> Your experience may be real, but presenting it professionally is a different skill.

Code2Job helps transform raw career information into structured, professional and ATS-friendly content while keeping the user's actual facts at the center.

It is designed for **developers, freshers, experienced professionals, teachers, MBA/HR professionals, pharma professionals, manufacturing professionals and other career domains**.

No fake achievements.
No invented experience.
No imaginary metrics.

Just better presentation of real information.

---

# 🚀 Features

## 01 — AI Resume Builder

Turn raw career information into professional resume content.

### Input

Users provide:

* Personal information
* Career type
* Target role
* Industry
* Education
* Work experience
* Responsibilities
* Tools and technologies
* Projects
* Technical skills
* Soft skills
* Certifications
* Achievements
* Additional information

### AI Output

Code2Job generates:

* Professional Summary
* Experience Bullet Points
* Project Description
* Technical Skills
* Soft Skills
* Additional Information

The AI is instructed to:

* Never invent employers
* Never invent technologies
* Never invent achievements
* Never create fake metrics
* Never exaggerate experience
* Improve grammar and clarity
* Maintain natural professional language

---

## 02 — ATS Resume Match Analyzer

Compare a resume against a target Job Description.

The planned analyzer will identify:

```text
Resume
   ↓
Job Description
   ↓
Keyword Analysis
   ↓
Skill Matching
   ↓
Missing Keywords
   ↓
ATS Match Result
```

The interface supports:

* Resume PDF upload
* Job Description PDF upload
* Job Description text input
* Match score
* Matching keywords
* Missing keywords
* Improvement recommendations

---

## 03 — Tech Project & Code Sanitizer

Designed especially for developers working with:

* Java
* Spring Boot
* REST APIs
* Backend systems
* SQL
* Web applications

Users can provide raw code and receive analysis around:

* Security concerns
* Performance issues
* Code quality
* Maintainability
* Potential improvements
* Resume-ready project impact statements

The goal is not only to improve code.

It is to help developers understand:

> **"What did I actually build, and how do I explain it professionally?"**

---

# 🎯 Why Code2Job?

Most career tools focus on generating text.

Code2Job focuses on the complete flow:

```text
RAW EXPERIENCE
       ↓
STRUCTURE
       ↓
AI REFINEMENT
       ↓
ATS ANALYSIS
       ↓
PROFESSIONAL PRESENTATION
       ↓
JOB APPLICATION
```

The core principle is:

### AI should improve presentation — not manufacture experience.

---

# 🧠 AI Safety Philosophy

Code2Job follows a strict factual approach to resume generation.

### The AI should NOT:

❌ Invent companies
❌ Invent job responsibilities
❌ Invent certifications
❌ Invent technologies
❌ Invent achievements
❌ Invent percentages
❌ Invent project results
❌ Exaggerate experience

### The AI SHOULD:

✅ Improve grammar
✅ Improve structure
✅ Convert raw language into professional language
✅ Create concise resume bullets
✅ Generate a professional summary from supplied information
✅ Preserve the user's actual experience
✅ Keep content ATS-friendly

---

# 🏗️ Architecture

Code2Job follows a layered monolithic architecture.

```text
                    ┌───────────────────────┐
                    │       Browser         │
                    │ HTML / CSS / JS       │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      Thymeleaf        │
                    │    Server-rendered     │
                    │       Frontend        │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      Controller       │
                    │ REST + MVC endpoints  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │       Service         │
                    │ Business Logic Layer  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    AI Integration     │
                    │    Spring AI +        │
                    │      Gemini           │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     Resume DTOs       │
                    │ Structured Response   │
                    └───────────────────────┘
```

---

# 🛠️ Tech Stack

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Java 25       | Core programming language      |
| Spring Boot   | Backend application framework  |
| Spring MVC    | Web & REST APIs                |
| Spring AI     | AI integration                 |
| Google Gemini | Generative AI                  |
| Thymeleaf     | Server-side frontend           |
| HTML5         | Page structure                 |
| CSS3          | UI styling                     |
| JavaScript    | Frontend interaction           |
| Maven         | Dependency & build management  |
| Git           | Version control                |
| GitHub        | Source control & collaboration |

---

# 🎨 UI Philosophy

Code2Job intentionally avoids the typical AI SaaS look.

Instead of:

```text
❌ Purple gradients
❌ Excessive glassmorphism
❌ Giant rounded cards
❌ Overloaded dashboards
```

The design focuses on:

```text
✓ Professional typography
✓ Warm off-white background
✓ Charcoal / navy text
✓ Rust accent
✓ Thin borders
✓ Moderate radius
✓ Clean spacing
✓ Minimal visual noise
✓ Responsive layouts
```

The goal:

> **It should feel like a serious career product, not an AI experiment.**

---

# 📁 Project Structure

```text
Code2Job/
│
├── src/
│   └── main/
│       │
│       ├── java/
│       │   └── com/
│       │       └── code2job/
│       │           └── code2job/
│       │               │
│       │               ├── ai/
│       │               │   └── GeminiService.java
│       │               │
│       │               ├── controller/
│       │               │   ├── HomeController.java
│       │               │   ├── AiTestController.java
│       │               │   └── ResumeController.java
│       │               │
│       │               ├── dto/
│       │               │   └── resume/
│       │               │       ├── PersonalDetailsDTO.java
│       │               │       ├── CareerDetailsDTO.java
│       │               │       ├── EducationDTO.java
│       │               │       ├── ExperienceDTO.java
│       │               │       ├── ProjectDTO.java
│       │               │       ├── SkillsDTO.java
│       │               │       ├── ResumeRequestDTO.java
│       │               │       └── ResumeResponseDTO.java
│       │               │
│       │               └── service/
│       │                   └── ResumeService.java
│       │
│       └── resources/
│           │
│           ├── static/
│           │   ├── css/
│           │   │   └── app.css
│           │   │
│           │   ├── js/
│           │   │   └── app.js
│           │   │
│           │   └── images/
│           │
│           ├── templates/
│           │   ├── index.html
│           │   ├── resume.html
│           │   ├── sanitizer.html
│           │   ├── ats.html
│           │   ├── profile.html
│           │   └── cover-letter.html
│           │
│           └── application.properties
│
├── pom.xml
├── README.md
├── mvnw
├── mvnw.cmd
└── .gitignore
```

---

# 🔄 Resume Generation Flow

The current resume generation flow is:

```text
User
 │
 │ fills resume form
 ▼
resume.html
 │
 │ JavaScript
 ▼
collectResumeData()
 │
 │ POST /api/resume/generate
 ▼
ResumeController
 │
 ▼
ResumeService
 │
 ▼
GeminiService
 │
 │ Spring AI
 ▼
Google Gemini
 │
 │ AI generated content
 ▼
ResumeResponseDTO
 │
 ▼
Frontend
 │
 ▼
Generated Resume Content
```

---

# 📦 Resume DTO Design

The resume request is divided into focused DTOs.

```text
ResumeRequestDTO
│
├── PersonalDetailsDTO
├── CareerDetailsDTO
├── EducationDTO
├── ExperienceDTO
├── ProjectDTO
└── SkillsDTO
```

This keeps the request model structured and easier to maintain.

The response currently contains:

```text
ResumeResponseDTO
│
├── professionalSummary
├── experienceBullets
├── projectDescription
├── technicalSkills
├── softSkills
└── additionalInformation
```

---

# 🔌 API Endpoints

## Home

```http
GET /
```

## Resume Builder

```http
GET /resume
```

## Generate Resume

```http
POST /api/resume/generate
```

## Gemini Connection Test

```http
GET /api/ai/test
```

## ATS Analyzer

```http
GET /ats
```

## ATS Analysis

```http
POST /api/ats/analyze
```

> ATS backend processing is part of the ongoing development roadmap.

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Code2Job.git
```

```bash
cd Code2Job
```

---

## 2. Configure Gemini API

Open:

```text
src/main/resources/application.properties
```

Configure your Gemini API key.

Example:

```properties
spring.application.name=Code2Job
server.port=8080

spring.ai.google.genai.api-key=YOUR_GEMINI_API_KEY
spring.ai.google.genai.chat.model=gemini-3.6-flash
spring.ai.google.genai.chat.temperature=0.3

spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=10MB

spring.thymeleaf.cache=false

logging.level.com.code2job=INFO
```

### Security

**Never commit your real API key to GitHub.**

Use environment variables or another secure configuration method before publishing the project publicly.

---

# ▶️ Run the Application

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### Linux / macOS

```bash
./mvnw spring-boot:run
```

Application:

```text
http://localhost:8080
```

---

# 🧪 Run Tests

Windows:

```powershell
.\mvnw.cmd clean test
```

Linux / macOS:

```bash
./mvnw clean test
```

---

# 🔬 Test Gemini Connection

Once the application is running, open:

```text
http://localhost:8080/api/ai/test
```

Expected response:

```text
Code2Job Gemini connection successful.
```

---

# 🖥️ Main Pages

| Page           | Route           | Purpose               |
| -------------- | --------------- | --------------------- |
| Home           | `/`             | Product landing page  |
| Resume Builder | `/resume`       | AI resume generation  |
| ATS Analyzer   | `/ats`          | Resume/JD matching    |
| Code Sanitizer | `/sanitizer`    | Code analysis         |
| Profile        | `/profile`      | User profile          |
| Cover Letter   | `/cover-letter` | Cover letter workflow |

---

# 📸 Screenshots

Add screenshots here as the UI evolves.

```text
docs/
└── screenshots/
    ├── home.png
    ├── resume-builder.png
    ├── resume-result.png
    ├── ats-analyzer.png
    └── code-sanitizer.png
```

Example:

### Home

> Add `home.png` here.

### Resume Builder

> Add `resume-builder.png` here.

### AI Generated Resume

> Add `resume-result.png` here.

---

# 🗺️ Roadmap

Code2Job is being developed incrementally.

## Phase 1 — Foundation

* [x] Spring Boot project setup
* [x] Thymeleaf integration
* [x] Shared CSS system
* [x] Shared JavaScript
* [x] Main navigation
* [x] Resume Builder UI
* [x] Resume DTO architecture
* [x] Gemini integration
* [x] Resume generation API
* [x] Frontend → Backend → AI flow

## Phase 2 — Resume Intelligence

* [ ] Structured Gemini JSON response
* [ ] Better resume preview
* [ ] Professional resume templates
* [ ] Dynamic resume sections
* [ ] Experience bullet optimization
* [ ] ATS-friendly formatting
* [ ] Resume PDF generation
* [ ] DOCX generation
* [ ] A4 layout optimization
* [ ] Sparse/dense resume layout handling

## Phase 3 — ATS Analyzer

* [ ] PDF text extraction
* [ ] Resume parsing
* [ ] Job description parsing
* [ ] Keyword extraction
* [ ] Skill matching
* [ ] Missing keyword analysis
* [ ] Match scoring
* [ ] Improvement recommendations

## Phase 4 — Developer Tools

* [ ] Java code sanitizer
* [ ] Spring Boot code analysis
* [ ] Security analysis
* [ ] Performance analysis
* [ ] Resume-ready project statements
* [ ] Code quality recommendations

## Phase 5 — Career Toolkit

* [ ] Cover letter generator
* [ ] Profile optimization
* [ ] Job-specific resume customization
* [ ] Target JD analysis
* [ ] Resume version management
* [ ] Export management

## Phase 6 — Production

* [ ] Authentication
* [ ] User accounts
* [ ] Database integration
* [ ] Resume history
* [ ] Secure API configuration
* [ ] Production deployment
* [ ] Error handling
* [ ] Monitoring
* [ ] Performance optimization

---

# 🧱 Engineering Principles

Code2Job follows a few simple principles.

### 1. Keep responsibilities separated

```text
Controller
    ↓
Service
    ↓
AI Integration
    ↓
DTO
```

### 2. Don't put business logic inside HTML.

### 3. Don't put AI logic inside controllers.

### 4. Don't expose API keys.

### 5. Don't let AI invent user information.

### 6. Prefer small focused classes.

### 7. Build features incrementally.

### 8. Test each layer before moving forward.

---

# 🔐 Security Considerations

The project is currently under active development.

Before production deployment, the following areas should be hardened:

* API key management
* Input validation
* File upload validation
* File size restrictions
* PDF parsing security
* Rate limiting
* Authentication
* Authorization
* CSRF protection where applicable
* Error response sanitization
* Logging hygiene
* Sensitive data handling

---

# 📈 Future Vision

Code2Job is intended to become more than a resume generator.

The long-term vision is:

```text
                 ┌────────────────────┐
                 │      CODE2JOB      │
                 └─────────┬──────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     RESUME AI        ATS ANALYZER      CODE TOOLS
          │                │                │
          ▼                ▼                ▼
    Resume PDF         JD Matching       Code Review
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                    CAREER TOOLKIT
```

The objective is to give users one place to:

**Create → Analyze → Improve → Apply**

---

# 🤝 Contributing

Contributions, ideas and improvements are welcome.

### Basic workflow

```bash
git clone YOUR_REPOSITORY
```

Create a branch:

```bash
git checkout -b feature/your-feature
```

Make your changes.

Run tests:

```bash
./mvnw clean test
```

Commit:

```bash
git commit -m "feat: add your feature"
```

Push:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

See the `LICENSE` file for details.

---

# 👨‍💻 Developer

Built with Java, Spring Boot, Spring AI and a lot of debugging.

### Code2Job

> **Build your experience. Structure your story. Get job-ready.**

---

<div align="center">

### ⚡ Code2Job

**AI-powered career tooling, built with Java.**

<br>

`Java` • `Spring Boot` • `Spring AI` • `Gemini` • `Thymeleaf`

<br>

**From Code → Career**

</div>
