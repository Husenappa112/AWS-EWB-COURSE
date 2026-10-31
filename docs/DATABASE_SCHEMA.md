# SHEK'sLMS — Database Schema Specification

This document defines the relational data model for SHEK'sLMS implemented in PostgreSQL via Prisma.

## Key Data Models

### 1. Organization & Multi-Tenancy
- **Organization (Tenant)**: `id`, `name`, `slug`, `logoUrl`, `primaryColor`, `status`, `createdAt`, `updatedAt`
- **Branch**: `id`, `organizationId`, `name`, `code`, `location`, `createdAt`
- **Department**: `id`, `organizationId`, `name`, `createdAt`
- **Group**: `id`, `organizationId`, `name`, `description`, `createdAt`

### 2. User & Access Control
- **User**: `id`, `organizationId` (nullable for SuperAdmin), `email`, `passwordHash`, `firstName`, `lastName`, `avatarUrl`, `role` (`SUPER_ADMIN`, `ORG_ADMIN`, `TRAINER`, `MANAGER`, `LEARNER`), `status` (`ACTIVE`, `INACTIVE`, `SUSPENDED`), `createdAt`
- **UserGroup**: `userId`, `groupId`
- **UserBranch**: `userId`, `branchId`
- **UserDepartment**: `userId`, `departmentId`

### 3. Course Management
- **Category**: `id`, `organizationId`, `name`, `slug`, `description`
- **Course**: `id`, `organizationId`, `createdById`, `categoryId`, `title`, `slug`, `description`, `thumbnailUrl`, `level` (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`), `status` (`DRAFT`, `PUBLISHED`, `ARCHIVED`), `durationMinutes`, `passPercentage`, `certificateEnabled`, `createdAt`, `updatedAt`
- **CoursePrerequisite**: `courseId`, `prerequisiteCourseId`
- **Module**: `id`, `courseId`, `title`, `order`, `createdAt`
- **Lesson**: `id`, `moduleId`, `title`, `type` (`VIDEO`, `PDF`, `DOCUMENT`, `QUIZ`, `ASSIGNMENT`, `SCORM`), `contentUrl`, `textContent`, `durationMinutes`, `order`, `isRequired`, `createdAt`

### 4. Learning Paths & Enrollments
- **LearningPath**: `id`, `organizationId`, `title`, `description`, `isMandatory`, `createdAt`
- **LearningPathCourse**: `learningPathId`, `courseId`, `order`
- **Enrollment**: `id`, `organizationId`, `userId`, `courseId`, `status` (`ENROLLED`, `IN_PROGRESS`, `COMPLETED`, `EXPIRED`), `progress` (Float 0-100), `enrolledAt`, `completedAt`, `dueDate`
- **LessonProgress**: `id`, `enrollmentId`, `lessonId`, `isCompleted`, `timeSpentSeconds`, `lastPositionSeconds`, `completedAt`

### 5. Assessments & Certifications
- **Assessment**: `id`, `courseId`, `title`, `timeLimitMinutes`, `passPercentage`, `shuffleQuestions`, `createdAt`
- **Question**: `id`, `assessmentId`, `type` (`MCQ`, `MULTIPLE_SELECT`, `TRUE_FALSE`, `DESCRIPTIVE`), `prompt`, `explanation`, `points`
- **QuestionOption**: `id`, `questionId`, `text`, `isCorrect`
- **AssessmentAttempt**: `id`, `assessmentId`, `userId`, `score`, `passed`, `startedAt`, `submittedAt`
- **Certificate**: `id`, `organizationId`, `userId`, `courseId`, `certificateCode`, `issuedAt`, `expiresAt`, `pdfUrl`

### 6. Gamification & System
- **GamificationProfile**: `userId`, `points`, `level`, `currentStreak`
- **Badge**: `id`, `name`, `description`, `iconUrl`, `criteriaType`
- **UserBadge**: `userId`, `badgeId`, `awardedAt`
- **AuditLog**: `id`, `organizationId`, `userId`, `action`, `entityType`, `entityId`, `metadataJson`, `ipAddress`, `createdAt`
