import { Router, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { authenticateJWT, AuthenticatedRequest } from '../../middleware/auth.js';

const router = Router();

// GET /api/v1/learners/enrolled - Get learner's enrolled courses with progress
router.get('/enrolled', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            category: true,
            creator: {
              select: { firstName: true, lastName: true },
            },
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
        lessonProgress: true,
      },
      orderBy: { enrolledAt: 'desc' },
    });

    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: 'Failed to fetch enrollments' },
    });
  }
});

// POST /api/v1/learners/lessons/:id/progress - Mark lesson complete and update overall course %
router.post('/lessons/:id/progress', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user!.userId;
    const { timeSpentSeconds = 60, lastPositionSeconds = 0, isCompleted = true } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Lesson not found' } });
      return;
    }

    const courseId = lesson.module.course.id;

    // Find enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (!enrollment) {
      res.status(403).json({ success: false, error: { code: 'NOT_ENROLLED', message: 'User is not enrolled in this course' } });
      return;
    }

    // Upsert lesson progress
    await prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId },
      },
      update: {
        isCompleted,
        timeSpentSeconds,
        lastPositionSeconds,
        completedAt: isCompleted ? new Date() : null,
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        isCompleted,
        timeSpentSeconds,
        lastPositionSeconds,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // Calculate overall course percentage
    const allLessons = lesson.module.course.modules.flatMap((m) => m.lessons);
    const completedProgress = await prisma.lessonProgress.findMany({
      where: {
        enrollmentId: enrollment.id,
        isCompleted: true,
      },
    });

    const totalCount = allLessons.length;
    const completedCount = completedProgress.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;
    const isFinished = progressPercent >= 100;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: progressPercent,
        status: isFinished ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: isFinished ? new Date() : null,
      },
    });

    // Check if certificate should be generated
    let certificate = null;
    if (isFinished && lesson.module.course.certificateEnabled) {
      const certCode = `CERT-${courseId.slice(0, 4).toUpperCase()}-${userId.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      certificate = await prisma.certificate.upsert({
        where: { certificateCode: certCode },
        update: {},
        create: {
          organizationId: enrollment.organizationId,
          userId,
          courseId,
          certificateCode: certCode,
        },
      });
    }

    res.json({
      success: true,
      data: {
        progress: progressPercent,
        isCompleted: isFinished,
        certificate,
      },
      message: 'Progress recorded',
    });
  } catch (error) {
    console.error('[Progress error]', error);
    res.status(500).json({ success: false, error: { code: 'PROGRESS_UPDATE_ERROR', message: 'Failed to update progress' } });
  }
});

// GET /api/v1/learners/assessments/:id - Fetch quiz with questions (excluding isCorrect)
router.get('/assessments/:id', authenticateJWT, async (req, res: Response) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: req.params.id },
      include: {
        questions: {
          include: {
            options: {
              select: { id: true, text: true }, // Hide isCorrect
            },
          },
        },
      },
    });

    if (!assessment) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Assessment not found' } });
      return;
    }

    res.json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: 'Failed to fetch assessment' } });
  }
});

// POST /api/v1/learners/assessments/:id/submit - Auto-grade quiz answers
router.post('/assessments/:id/submit', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const assessmentId = req.params.id;
    const userId = req.user!.userId;
    const { answers } = req.body; // Map: { [questionId: string]: string (selectedOptionId) }

    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!assessment) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Assessment not found' } });
      return;
    }

    let earnedPoints = 0;
    let totalPoints = 0;

    const review = assessment.questions.map((q) => {
      totalPoints += q.points;
      const selectedOptionId = answers ? answers[q.id] : null;
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = selectedOptionId === correctOption?.id;

      if (isCorrect) {
        earnedPoints += q.points;
      }

      return {
        questionId: q.id,
        prompt: q.prompt,
        explanation: q.explanation,
        selectedOptionId,
        correctOptionId: correctOption?.id,
        isCorrect,
      };
    });

    const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = scorePercentage >= assessment.passPercentage;

    const attempt = await prisma.assessmentAttempt.create({
      data: {
        assessmentId,
        userId,
        score: scorePercentage,
        passed,
        answersJson: JSON.stringify(answers),
      },
    });

    res.json({
      success: true,
      data: {
        attemptId: attempt.id,
        score: scorePercentage,
        passed,
        requiredPassPercentage: assessment.passPercentage,
        review,
      },
      message: passed ? 'Congratulations! You passed the assessment.' : 'You did not meet the passing score.',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'GRADING_FAILED', message: 'Failed to grade assessment' } });
  }
});

export default router;
