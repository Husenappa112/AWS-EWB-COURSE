# SHEK'sLMS — System Architecture Document

## 1. High-Level Architectural Vision
SHEK'sLMS is an enterprise-ready, multi-tenant Learning Management System engineered to provide a seamless training experience for global organizations. It mimics the deep structural richness of enterprise platforms like TalentLMS while infusing modern 2026 AI and analytics capabilities.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + React Router v6    |
|                                                                                   |
|  +--------------------+   +-----------------------+   +------------------------+  |
|  | Super Admin Portal |   | Trainer / Instructor  |   |    Learner Portal      |  |
|  | Organization Mgmt  |   | Course Builder        |   | Course Player          |  |
|  | Users & Groups     |   | Assessments & Grading |   | Quizzes & Notes        |  |
|  | System Reports     |   | Learning Paths        |   | Gamification & Badges  |  |
|  +--------------------+   +-----------------------+   +------------------------+  |
+------------------------------------------+----------------------------------------+
                                           | HTTPS / JSON REST API
+------------------------------------------v----------------------------------------+
|                                  API GATEWAY & MIDDLEWARE                         |
|  Express.js Server, CORS, Helmet, Rate Limiter, Auth JWT, RBAC Guard, Tenant Guard|
+------------------------------------------+----------------------------------------+
                                           |
+------------------------------------------v----------------------------------------+
|                                BUSINESS LOGIC MODULES                             |
|  - Auth & Identity Module         - Course & Content Engine                       |
|  - Multi-Tenant Manager           - Assessment & Quiz Engine                      |
|  - Enrollment & Progress Engine   - Gamification & Certificate Generator          |
|  - AI Services Adapter (Pluggable)- SCORM / xAPI Tracking Engine                  |
+------------------------------------------+----------------------------------------+
                                           |
                    +----------------------+-----------------------+
                    |                                              |
+-------------------v-------------------+      +-------------------v----------------+
|          DATABASE & STORAGE           |      |        EXTERNAL SERVICES           |
|  PostgreSQL with Prisma ORM           |      |  - Local / S3 File Storage         |
|  Tenant-scoped Relational Data Model  |      |  - Pluggable AI (OpenAI / Gemini)  |
|  Audit Logs & Activity Records        |      |  - Email / Notification Dispatcher |
+---------------------------------------+      +------------------------------------+
```

---

## 2. Multi-Tenant Architecture & Isolation
Organizations (Tenants) must have strictly isolated data:
- Every tenant has an `Organization` record.
- Core business entities (`User`, `Course`, `Enrollment`, `Assessment`, `Group`, `Branch`) are linked with an `organizationId`.
- Super Admins can manage cross-organization settings.
- Organization Admins, Trainers, and Learners are bound to their respective `organizationId`.
- The backend enforces tenant isolation at the middleware layer (`tenantGuard`) and at the query level.

---

## 3. Technology Stack Choices & Rationale

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite | Fast HMR, type safety, modular component hierarchy. |
| **Styling** | Tailwind CSS, Lucide React | Modern utility-first styling, consistent design tokens, dark/light theme. |
| **Backend** | Node.js, Express.js, TypeScript | Highly scalable asynchronous I/O, rapid feature iteration, typed contracts. |
| **Database** | PostgreSQL | Strong relational integrity for complex LMS relationships (enrollments, scoring, prerequisites). |
| **ORM** | Prisma ORM | Type-safe queries, automated migrations, explicit schema definitions. |
| **Validation** | Zod | Runtime schema validation across API payloads. |
| **Authentication**| JWT + bcrypt | Secure stateless token authentication with refresh mechanism. |
| **AI Integration**| Pluggable Provider Pattern | Supports mock/offline mode out-of-the-box, with optional Gemini / OpenAI adapter. |
