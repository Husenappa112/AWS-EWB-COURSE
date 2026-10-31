import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRouter from './modules/auth/auth.routes.js';
import coursesRouter from './modules/courses/courses.routes.js';
import learnersRouter from './modules/learner/learner.routes.js';
import aiRouter from './modules/ai/ai.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: "SHEK'sLMS API",
    version: '1.0.0',
    portals: ['SUPER_ADMIN', 'ORG_ADMIN', 'TRAINER', 'LEARNER'],
  });
});

// Mount module routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/learners', learnersRouter);
app.use('/api/v1/ai', aiRouter);

const server = app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`[SHEK'sLMS] API running on http://127.0.0.1:${PORT}`);
});

export default app;
