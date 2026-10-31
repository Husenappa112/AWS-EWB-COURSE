import dotenv from 'dotenv';
dotenv.config();

import { generateCourseWithAI, askAILearningAssistant } from './modules/ai/ai.service.js';

async function testAIServices() {
  console.log('====================================================');
  console.log("   SHEK'sLMS — AI Services Verification (2026)      ");
  console.log('====================================================\n');

  console.log('[Test 1] Testing AI Course & Quiz Generator...');
  const course = await generateCourseWithAI('Generative AI for Healthcare Compliance', 'INTERMEDIATE');
  console.log(`✅ AI Course Generated: "${course.title}"`);
  console.log(`   Description: ${course.description}`);
  console.log(`   Modules Generated: ${course.modules.length}`);
  course.modules.forEach((m, idx) => {
    console.log(`   - ${m.title} (${m.lessons.length} lessons)`);
  });
  console.log(`   Assessment Title: ${course.assessment.title}`);
  console.log(`   Questions Created: ${course.assessment.questions.length}`);
  course.assessment.questions.forEach((q, idx) => {
    console.log(`     Q${idx + 1}: ${q.prompt}`);
  });

  console.log('\n[Test 2] Testing AI Learning Assistant (Q&A with Source Citation)...');
  const answer = await askAILearningAssistant(
    'How do I identify spear phishing attempts?',
    'Enterprise Cybersecurity Essentials 2026',
    'Lesson 1.1 Recognizing Spear Phishing & Synthetic Spoofs'
  );
  console.log(`✅ AI Answer: ${answer.reply}`);
  console.log(`✅ Cited Source: ${answer.source}`);

  console.log('\n====================================================');
  console.log('   AI SERVICES VERIFIED SUCCESSFULLY!               ');
  console.log('====================================================');
}

testAIServices()
  .catch((err) => {
    console.error('❌ AI Verification error:', err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
