import { Router, Request, Response } from 'express';
import { generateCourseWithAI, askAILearningAssistant } from './ai.service.js';

const router = Router();

// POST /api/v1/ai/generate-course
router.post('/generate-course', async (req: Request, res: Response) => {
  try {
    const { topic, level = 'INTERMEDIATE' } = req.body;
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ success: false, error: { message: 'Topic is required' } });
      return;
    }

    const courseData = await generateCourseWithAI(topic, level);
    res.json({
      success: true,
      data: courseData,
      message: 'Course curriculum synthesized successfully with AI',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to generate course' } });
  }
});

// POST /api/v1/ai/chat-assistant
router.post('/chat-assistant', async (req: Request, res: Response) => {
  try {
    const { question, courseTitle = 'Corporate Training', lessonContext } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ success: false, error: { message: 'Question is required' } });
      return;
    }

    const result = await askAILearningAssistant(question, courseTitle, lessonContext);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to process AI inquiry' } });
  }
});

export default router;
