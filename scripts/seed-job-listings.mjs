/**
 * Seed job listings into Sanity.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... node --env-file=.env scripts/seed-job-listings.mjs
 */
import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN (Editor/Admin token with create permissions)'
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-13',
  token,
  useCdn: false,
})

const key = () => randomBytes(6).toString('hex')

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

function blocks(...paragraphs) {
  return paragraphs.filter(Boolean).map((p) => block(p))
}

function numberedBlocks(items) {
  return items.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'number',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }))
}

function group(groupTitle, bullets) {
  return { _type: 'responsibilityGroup', _key: key(), groupTitle, bullets }
}

function stage(name, description) {
  return { _type: 'selectionStage', _key: key(), stage: name, description }
}

const ABOUT_DEFAULT = blocks(
  'Sarwagyna Private Limited is an AI systems company incorporated in Ongole, Andhra Pradesh, building automation and intelligence products for India-first use cases.',
  'Our flagship product is SvaraRx — an AI-powered voice-to-prescription SaaS for solo and small-clinic doctors across Andhra Pradesh and Telangana.',
  'Doctors speak. SvaraRx listens, understands, and generates a structured prescription in under 35 seconds.'
)

const listings = [
  {
    _id: 'jobListing.stt-fine-tuning-data-engineering-intern',
    _type: 'jobListing',
    title: 'STT Fine-Tuning & Data Engineering Intern',
    slug: { _type: 'slug', current: 'stt-fine-tuning-data-engineering-intern' },
    employmentType: 'Internship',
    engagement: 'Remote · 3 Months',
    location: 'Remote (India)',
    stipendOrCompensation: 'Performance-based',
    applicationsCloseDate: '2026-06-20',
    isActive: true,
    sortOrder: 1,
    summary:
      'Fine-tune Whisper STT on medical Telugu-English speech for SvaraRx. Build drug name datasets, run benchmarks, improve accuracy. Real code. Real product. Patient safety impact.',
    aboutSarwagyna: ABOUT_DEFAULT,
    problemStatement: blocks(
      'Generic STT models like Whisper perform well on clean English speech. They fail on:',
      '→ Telugu-English code-switched medical speech',
      '→ Drug names with similar phonetics (Metformin vs Metoprolol, Amlodipine vs Amitriptyline)',
      '→ Indian doctor accents and speech patterns',
      '→ Dosage instructions in mixed language ("Tab Metformin 500mg BD after food")',
      'A wrong drug name in an AI-generated prescription is a patient safety issue — not just a model error.',
      'Your work directly impacts how accurately SvaraRx transcribes doctor speech in real clinical settings.'
    ),
    roleOverview: blocks(
      'You will own two interconnected workstreams:',
      '1. DATA — Build, clean, and manage the audio dataset that our STT models train and evaluate on.',
      '2. FINE-TUNING — Fine-tune OpenAI Whisper on our domain-specific medical dataset and benchmark it against Sarvam Saarika on drug name accuracy.',
      'You report directly to the Founder. Your output goes into production.'
    ),
    keyResponsibilities: [
      group('Data Collection & Engineering', [
        'Build and maintain a structured medical audio dataset covering drug names, symptoms, dosages, and prescription instructions in Telugu-English code-switched speech',
        'Source publicly available medical speech datasets (Common Voice, OpenSLR, LibriSpeech derivatives, Mozilla Common Voice Telugu) and evaluate their relevance to our use case',
        'Annotate and transcribe audio samples — building ground truth transcriptions for model evaluation',
        'Expand our drug name corpus from 102 current entries to 500+ entries with phonetic variants, common mispronunciations, Telugu transliterations, and brand vs generic mappings',
        'Build preprocessing pipelines: noise reduction, silence trimming, normalization, audio segmentation, format standardisation',
        'Manage dataset versioning and documentation — every data decision must be recorded',
      ]),
      group('STT Fine-Tuning & Evaluation', [
        'Fine-tune OpenAI Whisper (small or medium) on our medical domain dataset using Hugging Face Trainer API',
        'Design and run evaluation benchmarks measuring WER overall, WER on drug names, WER on dosage instructions, and latency per transcription',
        'Compare fine-tuned Whisper performance against Sarvam Saarika on our benchmark dataset',
        'Identify and document high-risk drug name pairs — phonetically similar names where confusion could cause patient harm',
        'Iterate on training data composition and hyperparameters to improve accuracy on identified failure modes',
        'Maintain a model versioning log — every training run documented with data version, config, and benchmark results',
      ]),
    ],
    techStack: [
      'Python 3.10+',
      'Hugging Face Transformers',
      'PyTorch',
      'OpenAI Whisper',
      'Sarvam Saarika',
      'Librosa',
      'SoundFile',
      'FFmpeg',
      'jiwer',
      'JSON/CSV annotation pipelines',
      'AWS S3 / Supabase Storage',
      'Google Colab Pro / Kaggle',
      'Git + GitHub',
    ],
    requirementsMandatory: [
      'Strong Python — clean, documented, functional code',
      'Understanding of fine-tuning concepts — you know what it means and why it matters',
      'Familiarity with Hugging Face ecosystem',
      'GitHub profile with real code (no profile = rejected)',
      'Ability to work independently with minimal supervision and flag blockers proactively',
    ],
    requirementsPreferred: [
      'Telugu language proficiency — critical for understanding code-switching patterns and annotating audio accurately',
      'Prior experience fine-tuning any STT or NLP model',
      'Audio processing experience (librosa, ffmpeg)',
      'Understanding of WER and audio evaluation metrics',
    ],
    goodToHave: [
      'Medical or pharmacy domain knowledge',
      'Experience with Common Voice or similar datasets',
      'Familiarity with Sarvam AI models',
    ],
    whoThisIsNotFor: [
      'Anyone looking for a certificate without doing real work',
      'Anyone who needs hand-holding on basic Python',
      "Anyone who won't document their work",
      'Anyone who treats data annotation as low-priority background work',
    ],
    whatYouGet: [
      'Real production ML work on a live healthcare AI product used by doctors',
      'Access to compute resources (Google Colab Pro / Kaggle)',
      'Co-authorship credit on technical documentation and model evaluation reports',
      'Strong Letter of Recommendation from Sarwagyna Private Limited',
      'Official Certificate of Completion',
      'Stipend: Performance based',
      'First preference for extended role if product scales during your tenure',
    ],
    selectionProcess: [
      stage('Application screening', 'Review of GitHub profile and application form responses'),
      stage(
        'Technical task (48 hours)',
        'A short, specific task involving audio preprocessing or WER evaluation'
      ),
      stage(
        'Founder call (30 minutes)',
        'Direct conversation with Sarwan T, Founder & CEO, Sarwagyna'
      ),
    ],
    applicationInstructions: [
      ...numberedBlocks([
        'Name, college, year, email, LinkedIn, GitHub',
        'Have you fine-tuned any STT or NLP model before? If yes — describe the model, dataset, metric you measured, and what you improved. Be specific. No generic answers.',
        'Do you speak or understand Telugu? Be honest. Proficiency level.',
        'What is WER (Word Error Rate)? Explain in 2 lines without Googling.',
        'SvaraRx transcribes doctors speaking Telugu-English mixed speech with drug names like "Tab Metformin 500mg BD" and "Inj Tramadol 50mg IV SOS". What would your approach be to improve STT accuracy on drug names specifically? No right answer — we want to see how you think.',
        'GitHub profile URL — mandatory. No profile means no interview.',
      ]),
      block('APPLICATIONS CLOSE: June 20, 2026'),
    ],
    applyUrl: 'mailto:sarwan@sarwagyna.com',
  },
  {
    _id: 'jobListing.ai-agent-llm-engineer-intern',
    _type: 'jobListing',
    title: 'AI Agent & LLM Engineer Intern',
    slug: { _type: 'slug', current: 'ai-agent-llm-engineer-intern' },
    employmentType: 'Internship',
    engagement: 'Remote / Flexible Hours / 3 Months',
    location: 'Remote (India)',
    stipendOrCompensation: 'Up to ₹10,000 based on performance',
    isActive: true,
    sortOrder: 2,
    summary:
      'Build a stateful AI agent that conducts real-time voice conversations and qualifies leads using LLMs.',
    aboutSarwagyna: ABOUT_DEFAULT,
    roleOverview: blocks(
      'You will build the intelligence layer of LeadFlow AI — a stateful AI agent that conducts real-time conversations, qualifies leads, and makes decisions during live voice calls.',
      'This is not a basic prompt engineering role. You will design structured conversation flows, manage state across multiple turns, and build systems that produce consistent, reliable outputs in real time.',
      'We are looking for engineers who can think in systems, not just prompts.'
    ),
    keyResponsibilities: [
      group('What You Will Work On', [
        'Designing a stateful conversation engine that tracks context across multiple turns',
        'Building lead qualification logic based on responses and intent signals',
        'Implementing objection handling and branching conversation flows',
        'Generating structured outputs (JSON) for CRM and analytics systems',
        'Designing decision triggers for actions like booking or human transfer',
        'Ensuring consistency, clarity, and control in AI-generated responses',
      ]),
    ],
    techStack: [
      'OpenAI API / compatible LLM systems',
      'Node.js',
      'TypeScript',
      'Prompt design',
      'Structured outputs',
      'State management',
    ],
    requirementsMandatory: [
      'At least one project involving LLMs or AI workflows',
      'Understanding of multi-turn conversations and logic flows',
      'Ability to design deterministic behavior on top of probabilistic models',
      'Strong problem-solving and system thinking skills',
    ],
    whatYouGet: [
      'Stipend up to ₹10,000 based on performance',
      'Certificate and public recognition',
      'Hands-on experience building real AI systems',
      'Opportunity to work on core product intelligence',
    ],
    selectionProcess: [
      stage('Application review', 'Screening of your application and relevant projects'),
      stage('3-hour AI task', 'Build a stateful agent'),
      stage('Technical interview', 'Focusing on logic and design'),
      stage('Trial task', '3–5 day trial task'),
    ],
    applyUrl:
      'mailto:sarwan@sarwagyna.com?subject=Application%20—%20AI%20Engineer%20Intern',
  },
  {
    _id: 'jobListing.backend-integrations-engineer-intern',
    _type: 'jobListing',
    title: 'Backend & Integrations Engineer Intern',
    slug: { _type: 'slug', current: 'backend-integrations-engineer-intern' },
    employmentType: 'Internship',
    engagement: 'Remote',
    location: 'Remote (India)',
    isActive: false,
    sortOrder: 3,
    summary:
      'Inactive stub — paste full listing content from Supabase into Sanity Studio when available.',
  },
  {
    _id: 'jobListing.frontend-engineer-intern-nextjs',
    _type: 'jobListing',
    title: 'Frontend Engineer Intern (Next.js)',
    slug: { _type: 'slug', current: 'frontend-engineer-intern-nextjs' },
    employmentType: 'Internship',
    engagement: 'Remote',
    location: 'Remote (India)',
    isActive: false,
    sortOrder: 4,
    summary:
      'Inactive stub — paste full listing content from Supabase into Sanity Studio when available.',
  },
  {
    _id: 'jobListing.research-intern-ai-product-strategy',
    _type: 'jobListing',
    title: 'Research Intern — AI & Product Strategy',
    slug: { _type: 'slug', current: 'research-intern-ai-product-strategy' },
    employmentType: 'Internship',
    engagement: 'Remote',
    location: 'Remote (India)',
    isActive: false,
    sortOrder: 5,
    summary:
      'Inactive stub — paste full listing content from Supabase into Sanity Studio when available.',
  },
]

async function main() {
  const tx = client.transaction()
  for (const doc of listings) {
    tx.createOrReplace(doc)
  }
  await tx.commit()
  console.log(`Seeded ${listings.length} job listings:`)
  for (const doc of listings) {
    console.log(`  - [${doc.isActive ? 'active' : 'inactive'}] ${doc.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
