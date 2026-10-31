# SHEK'sLMS — REST API Documentation

## Base URL
`/api/v1`

## Standard Request & Response Structure
All responses adhere to the standard envelope:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "meta": {
    "timestamp": "2026-10-31T11:00:00Z",
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired authentication credentials",
    "details": []
  }
}
```

---

## Endpoint Matrix

### 1. Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` — Register new user/tenant
- `POST /api/v1/auth/login` — Authenticate and receive JWT
- `POST /api/v1/auth/refresh` — Refresh access token
- `GET /api/v1/auth/me` — Retrieve current authenticated session & profile
- `POST /api/v1/auth/logout` — Invalidate session

### 2. Organization & Administration (`/api/v1/organizations`, `/api/v1/admin`)
- `GET /api/v1/organizations` — List organizations (Super Admin)
- `POST /api/v1/organizations` — Create organization
- `GET /api/v1/admin/users` — List organization users
- `POST /api/v1/admin/users` — Provision new user / trainer
- `GET /api/v1/admin/branches` — Manage branches and departments
- `GET /api/v1/admin/audit-logs` — Query audit trail

### 3. Course Management (`/api/v1/courses`)
- `GET /api/v1/courses` — List courses (supports search, filter, status)
- `POST /api/v1/courses` — Create new course
- `GET /api/v1/courses/:id` — Course details with modules & lessons
- `PUT /api/v1/courses/:id` — Update course metadata
- `POST /api/v1/courses/:id/modules` — Add curriculum module
- `POST /api/v1/courses/:id/lessons` — Add lesson content
- `PATCH /api/v1/courses/:id/publish` — Publish / Archive course

### 4. Learner & Progress (`/api/v1/learners`)
- `GET /api/v1/learners/enrolled` — List user's active enrollments
- `POST /api/v1/learners/enroll` — Self-enroll in a course
- `GET /api/v1/learners/courses/:id/player` — Player payload with last position
- `POST /api/v1/learners/lessons/:id/progress` — Record lesson progress / completion
- `GET /api/v1/learners/certificates` — View earned certificates

### 5. Assessments (`/api/v1/assessments`)
- `GET /api/v1/assessments/:id` — Start assessment (questions payload)
- `POST /api/v1/assessments/:id/submit` — Submit answers, receive instant grading
- `GET /api/v1/assessments/certificates/verify/:code` — Public certificate verification

### 6. AI & Intelligent Learning (`/api/v1/ai`)
- `POST /api/v1/ai/generate-course-outline` — Generate course structure
- `POST /api/v1/ai/generate-quiz` — Generate questions from course material
- `POST /api/v1/ai/chat-assistant` — Contextual learner question answering
