import { Router, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { authenticateJWT, AuthenticatedRequest, requireRoles } from '../../middleware/auth.js';

const router = Router();

// GET /api/v1/courses - List courses
router.get('/', async (req, res: Response) => {
  try {
    const { category, search, level } = req.query;

    const whereClause: any = {
      status: 'PUBLISHED',
    };

    if (category) {
      whereClause.categoryId = String(category);
    }
    if (level) {
      whereClause.level = String(level);
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: String(search) } },
        { description: { contains: String(search) } },
      ];
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        category: true,
        creator: {
          select: { firstName: true, lastName: true },
        },
        _count: {
          select: { modules: true, enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: 'Failed to fetch courses' },
    });
  }
});

// GET /api/v1/courses/:id - Course full details
router.get('/:id', async (req, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
        creator: {
          select: { firstName: true, lastName: true, avatarUrl: true },
        },
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                assessment: {
                  select: { id: true, title: true, timeLimitMinutes: true, passPercentage: true },
                },
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!course) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Course not found' },
      });
      return;
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: 'Failed to fetch course details' },
    });
  }
});

// POST /api/v1/courses/:id/enroll - Enroll learner in course
router.post('/:id/enroll', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const courseId = req.params.id;
    const userId = req.user!.userId;
    const organizationId = req.user!.organizationId || '';

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existing) {
      res.json({
        success: true,
        data: existing,
        message: 'Already enrolled',
      });
      return;
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        courseId,
        userId,
        organizationId,
        status: 'ENROLLED',
        progress: 0,
      },
    });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Enrolled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'ENROLL_FAILED', message: 'Failed to enroll in course' },
    });
  }
});

export default router;
