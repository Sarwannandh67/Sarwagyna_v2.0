'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CtaButton from '@/components/ui/CtaButton'

const values = [
  {
    title: 'Autonomy Over Micromanagement',
    description:
      "You were hired because you're good. We give you the context, the tools, and the trust — then we get out of your way.",
  },
  {
    title: 'Deep Work Over Performative Busyness',
    description:
      'We protect focus time. Long meetings and unnecessary check-ins are not our culture. Results are.',
  },
  {
    title: 'Continuous Learning',
    description:
      'Every team member gets a learning budget. We expect you to grow here — and we invest in making that happen.',
  },
  {
    title: 'Radical Transparency',
    description:
      'Company direction, financials, and decisions are shared openly with the team. No information silos, no closed-door strategy.',
  },
  {
    title: 'Move Fast, Fix Fast',
    description: "We ship, we learn, we iterate. Mistakes are fine — hiding them isn't.",
  },
  {
    title: 'Global Impact, Indian Heart',
    description: "We're proud of where we come from. We're ambitious about where we're going.",
  },
]

const benefits = [
  {
    title: 'Competitive Compensation',
    description:
      'Market-rate salaries with performance-linked bonuses and future equity options as the company scales.',
  },
  {
    title: 'Flexible Hours',
    description:
      'We care about when you deliver, not when you log in. Build a schedule that works for your life.',
  },
  {
    title: 'Remote-First',
    description:
      'Work from anywhere in India. We have no mandatory office days — just optional ones for team sprints and offsites.',
  },
  {
    title: 'Learning Budget',
    description:
      'Annual budget for courses, books, conferences, and certifications — because your growth is our growth.',
  },
  {
    title: 'International Exposure',
    description:
      'Work on projects with clients and partners across multiple countries. Your work has a global footprint from day one.',
  },
  {
    title: 'Open-Door Leadership',
    description:
      'Direct access to founders and senior leadership. Your ideas will be heard — not filtered through three layers of management.',
  },
  {
    title: 'Real Ownership',
    description:
      "You won't be a cog here. You'll own your work, your roadmap, and your outcomes.",
  },
]

const hiringSteps = [
  { title: 'Apply', desc: 'Send us your resume and a short note on why Sarwagyna and why now.' },
  { title: 'Intro Call', desc: 'A 30-minute conversation with our team to understand your background.' },
  {
    title: 'Assessment',
    desc: 'A practical, role-specific task — taking no more than 2–3 hours. We respect your time.',
  },
  {
    title: 'Final Interview',
    desc: 'A deeper conversation with the founders. We talk about vision, values, and fit.',
  },
  { title: 'Offer', desc: 'Fast decisions. No ghost rounds.' },
]

export function CareersHero() {
  return (
    <div className="text-center mb-24 max-w-[720px] mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-5"
      >
        Join the team
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-4xl sm:text-5xl md:text-[56px] font-display font-bold text-text mb-6 tracking-tight leading-[1.08]"
      >
        Build the Future With Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-[17px] sm:text-[18px] text-text-secondary leading-relaxed mb-4"
      >
        We&apos;re looking for people who are restless, rigorous, and ready to do the best work of
        their lives.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="text-[15px] text-text-muted leading-relaxed"
      >
        We&apos;re not building just another company. We&apos;re building something that sits at the
        intersection of AI and software — and we&apos;re doing it from India, for the world. If that
        excites you, you&apos;re our kind of person.
      </motion.p>
    </div>
  )
}

export function LifeAtSarwagyna() {
  return (
    <section className="mb-28">
      <div className="max-w-[680px] mx-auto mb-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-5 tracking-tight">
          Life at Sarwagyna
        </h2>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
          We&apos;re a small team doing big things. That means you&apos;ll wear multiple hats, make
          real decisions, and see the direct impact of your work — sometimes within days. There&apos;s
          no bureaucracy to navigate, no politics to play. Just smart people working on hard problems
          together.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          We&apos;re remote-friendly, async-first, and deeply committed to giving everyone the space
          to do their best thinking. We care about output, not optics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {values.map((val, i) => (
          <motion.div
            key={val.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <h3 className="text-[15px] font-semibold text-text mb-2">{val.title}</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{val.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function WhyWorkHere() {
  return (
    <section className="mb-28">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-10 text-center tracking-tight">
        Why Work Here
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-[880px] mx-auto">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
          >
            <h3 className="text-[15px] font-semibold text-text mb-1.5">{benefit.title}</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function HiringProcess() {
  return (
    <section className="max-w-[960px] mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-12 tracking-tight">
        Our Hiring Process
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
        <div className="hidden md:block absolute top-[18px] left-[10%] right-[10%] h-px bg-border-subtle z-0" />
        {hiringSteps.map((process, i) => (
          <motion.div
            key={process.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-9 h-9 rounded-full bg-bg border border-border-subtle flex items-center justify-center text-[13px] font-semibold text-text mb-4">
              {i + 1}
            </div>
            <h3 className="text-[14px] font-semibold text-text mb-1.5">{process.title}</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed max-w-[160px]">
              {process.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
        <CtaButton href="mailto:contact@sarwagyna.com">Send Speculative Application</CtaButton>
      </div>
    </section>
  )
}

export function SpeculativeCta() {
  return (
    <div className="mt-12 max-w-lg mx-auto text-center border-t border-border-subtle pt-10">
      <h3 className="text-[15px] font-semibold text-text mb-2">Don&apos;t see your role?</h3>
      <p className="text-[13px] text-text-secondary mb-3 leading-relaxed">
        We hire for talent first. If you believe you can contribute to what we&apos;re building, send
        us your profile anyway.
      </p>
      <a
        href="mailto:sarwan@sarwagyna.com"
        className="text-[14px] font-medium text-text inline-flex items-center gap-1.5 hover:text-text-secondary transition-colors"
      >
        sarwan@sarwagyna.com <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}
