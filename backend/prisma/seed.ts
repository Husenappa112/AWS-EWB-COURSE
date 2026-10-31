import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[SHEK\'sLMS Seed] Seeding demo database...');

  // 1. Password hash
  const defaultPasswordHash = await bcrypt.hash('Password@123', 10);

  // 2. Super Admin (Global, no org)
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@shekslms.com' },
    update: {},
    create: {
      email: 'superadmin@shekslms.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Shek',
      lastName: 'PlatformAdmin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  // 3. Organization: Acme Global Training
  const acmeOrg = await prisma.organization.upsert({
    where: { slug: 'acme' },
    update: {},
    create: {
      name: 'Acme Corporation',
      slug: 'acme',
      primaryColor: '#2563eb',
      status: 'ACTIVE',
    },
  });

  // 4. Branch & Department
  const techDept = await prisma.department.create({
    data: {
      organizationId: acmeOrg.id,
      name: 'Engineering & Technology',
    },
  });

  const bengaluruBranch = await prisma.branch.create({
    data: {
      organizationId: acmeOrg.id,
      name: 'Bengaluru HQ',
      code: 'BLR-01',
      location: 'Bengaluru, India',
    },
  });

  // 5. Org Admin
  const orgAdmin = await prisma.user.upsert({
    where: { email: 'admin@acme.com' },
    update: {},
    create: {
      organizationId: acmeOrg.id,
      email: 'admin@acme.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Rajesh',
      lastName: 'Sharma',
      role: 'ORG_ADMIN',
      status: 'ACTIVE',
      departmentId: techDept.id,
      branchId: bengaluruBranch.id,
    },
  });

  // 6. Trainer
  const trainer = await prisma.user.upsert({
    where: { email: 'trainer@acme.com' },
    update: {},
    create: {
      organizationId: acmeOrg.id,
      email: 'trainer@acme.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Ananya',
      lastName: 'Iyer',
      role: 'TRAINER',
      status: 'ACTIVE',
      departmentId: techDept.id,
      branchId: bengaluruBranch.id,
    },
  });

  // 7. Learner
  const learner = await prisma.user.upsert({
    where: { email: 'learner@acme.com' },
    update: {},
    create: {
      organizationId: acmeOrg.id,
      email: 'learner@acme.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Arjun',
      lastName: 'Verma',
      role: 'LEARNER',
      status: 'ACTIVE',
      departmentId: techDept.id,
      branchId: bengaluruBranch.id,
    },
  });

  // Gamification profile for learner
  await prisma.gamificationProfile.upsert({
    where: { userId: learner.id },
    update: {},
    create: {
      userId: learner.id,
      points: 450,
      level: 2,
      currentStreak: 5,
    },
  });

  // 8. Categories
  const catSecurity = await prisma.category.create({
    data: {
      organizationId: acmeOrg.id,
      name: 'Information Security & Compliance',
      slug: 'infosec-compliance',
      description: 'Mandatory workplace security and data protection training',
    },
  });

  const catAI = await prisma.category.create({
    data: {
      organizationId: acmeOrg.id,
      name: 'Modern AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Applied Generative AI and modern intelligent systems',
    },
  });

  // 9. Course 1: Enterprise Cybersecurity Essentials 2026
  const course1 = await prisma.course.create({
    data: {
      organizationId: acmeOrg.id,
      createdById: trainer.id,
      categoryId: catSecurity.id,
      title: 'Enterprise Cybersecurity Essentials 2026',
      slug: 'enterprise-cybersecurity-2026',
      description: 'Master defense fundamentals, phishing detection, data classification, and incident reporting protocols.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      durationMinutes: 45,
      passPercentage: 80,
      certificateEnabled: true,
      modules: {
        create: [
          {
            title: 'Module 1: Threat Landscape & Social Engineering',
            order: 1,
            lessons: {
              create: [
                {
                  title: '1.1 Recognizing Spear Phishing & AI-generated Spoofs',
                  type: 'DOCUMENT',
                  durationMinutes: 10,
                  order: 1,
                  textContent: `## Recognizing Spear Phishing\n\nModern spear phishing leverages hyper-personalized data and synthetic speech. Always verify out-of-band for unusual wire transfers or credential requests.\n\n### Key Indicators:\n- Urgent language bypassing standard SOP\n- Mismatched sender domains\n- Unexpected QR codes or attachments`,
                },
                {
                  title: '1.2 Multi-Factor Authentication & Device Hygiene',
                  type: 'VIDEO',
                  contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  durationMinutes: 15,
                  order: 2,
                  textContent: 'Watch this overview on FIDO2 hardware keys and authenticator apps.',
                },
              ],
            },
          },
          {
            title: 'Module 2: Compliance Knowledge Check',
            order: 2,
            lessons: {
              create: [
                {
                  title: '2.1 Mandatory Cybersecurity Quiz',
                  type: 'QUIZ',
                  durationMinutes: 15,
                  order: 1,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });

  // Add Quiz Assessment to Lesson 2.1
  const quizLesson = course1.modules[1].lessons[0];
  const assessment = await prisma.assessment.create({
    data: {
      courseId: course1.id,
      lessonId: quizLesson.id,
      title: 'Mandatory Cybersecurity Certification Quiz',
      timeLimitMinutes: 15,
      passPercentage: 80,
      shuffleQuestions: true,
      questions: {
        create: [
          {
            type: 'MCQ',
            prompt: 'What is the most secure method for Multi-Factor Authentication (MFA)?',
            explanation: 'Hardware security keys (FIDO2/WebAuthn) are cryptographically bound and immune to adversary-in-the-middle phishing.',
            points: 10,
            options: {
              create: [
                { text: 'SMS Text Message Codes', isCorrect: false },
                { text: 'Hardware Security Key (FIDO2 / YubiKey)', isCorrect: true },
                { text: 'Email Verification Link', isCorrect: false },
                { text: 'Security Questions', isCorrect: false },
              ],
            },
          },
          {
            type: 'MCQ',
            prompt: 'You receive an urgent message from the CFO requesting an immediate wire transfer via WhatsApp. What should you do?',
            explanation: 'Never bypass financial verification SOPs regardless of claimed urgency or authority.',
            points: 10,
            options: {
              create: [
                { text: 'Immediately process the wire because it is the CFO', isCorrect: false },
                { text: 'Verify via standard corporate protocol and internal communication channel', isCorrect: true },
                { text: 'Reply on WhatsApp asking for their bank details', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // 10. Enroll learner into Course 1
  const enrollment = await prisma.enrollment.create({
    data: {
      organizationId: acmeOrg.id,
      userId: learner.id,
      courseId: course1.id,
      status: 'IN_PROGRESS',
      progress: 50.0,
      lessonProgress: {
        create: [
          {
            lessonId: course1.modules[0].lessons[0].id,
            isCompleted: true,
            timeSpentSeconds: 600,
            completedAt: new Date(),
          },
        ],
      },
    },
  });

  // 11. Badges
  const badge1 = await prisma.badge.create({
    data: {
      name: 'Security Shield',
      description: 'Completed enterprise cybersecurity training',
      icon: 'ShieldCheck',
      criteriaType: 'FIRST_COURSE',
    },
  });

  await prisma.userBadge.create({
    data: {
      userId: learner.id,
      badgeId: badge1.id,
    },
  });

  console.log('[SHEK\'sLMS Seed] Seed completed successfully!');
  console.log('Demo Credentials:');
  console.log('1. Super Admin: superadmin@shekslms.com / Password@123');
  console.log('2. Org Admin:   admin@acme.com           / Password@123');
  console.log('3. Trainer:     trainer@acme.com         / Password@123');
  console.log('4. Learner:     learner@acme.com         / Password@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
