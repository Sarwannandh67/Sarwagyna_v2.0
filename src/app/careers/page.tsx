import type { Metadata } from 'next'
import { getActiveJobListings } from '@/sanity/lib/data'
import JobCard from '@/components/careers/JobCard'
import {
  CareersHero,
  LifeAtSarwagyna,
  WhyWorkHere,
  HiringProcess,
  SpeculativeCta,
} from '@/components/careers/CareersSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Careers at Sarwagyna — Join Our AI & Tech Team',
  description:
    "Join Sarwagyna's team and help build the future of AI and enterprise software. Explore open positions, our culture, and why builders choose to work with us.",
}

export default async function CareersPage() {
  const listings = await getActiveJobListings()

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text pt-16">
      <section className="py-20 sm:py-24 relative overflow-hidden" id="careers">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <CareersHero />
          <LifeAtSarwagyna />

          <section className="mb-28" id="open-positions">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-3 tracking-tight">
                Open Positions
              </h2>
              <p className="text-[15px] text-text-secondary">
                Join us in building the future of AI
              </p>
            </div>

            {listings.length === 0 ? (
              <p className="text-center text-text-muted text-[15px] py-12">
                No open positions right now. Check back soon.
              </p>
            ) : (
              <div className="border-t border-border-subtle">
                {listings.map((listing) => (
                  <JobCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}

            <SpeculativeCta />
          </section>

          <WhyWorkHere />
          <HiringProcess />
        </div>
      </section>
    </div>
  )
}
