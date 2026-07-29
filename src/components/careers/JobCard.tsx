import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { JobListingCard } from '@/types/jobListing'

export default function JobCard({ listing }: { listing: JobListingCard }) {
  const meta = [listing.engagement, listing.location].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/careers/${listing.slug}`}
      className="group block py-8 border-b border-border-subtle last:border-b-0 hover:bg-surface/60 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
            <h3 className="text-lg sm:text-xl font-display font-bold text-text tracking-tight group-hover:text-text-secondary transition-colors">
              {listing.title}
            </h3>
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-text-muted border border-border-subtle px-2 py-0.5">
              {listing.employmentType}
            </span>
          </div>
          {meta && (
            <p className="text-[13px] text-text-muted mb-3">{meta}</p>
          )}
          <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
            {listing.summary}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text shrink-0 mt-1 group-hover:gap-2.5 transition-all">
          View role
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
