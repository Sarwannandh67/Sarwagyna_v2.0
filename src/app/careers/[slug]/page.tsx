import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import { getJobListingBySlug, getAllJobListingSlugs } from '@/sanity/lib/data'
import { careersPtComponents } from '@/components/careers/portableText'
import CtaButton from '@/components/ui/CtaButton'
import JobShareButton from '@/components/careers/JobShareButton'

export const revalidate = 60

const DEFAULT_APPLY = 'mailto:sarwan@sarwagyna.com'

export async function generateStaticParams() {
  const slugs = await getAllJobListingSlugs()
  return slugs
    .filter((s: { slug: string | null }) => !!s.slug)
    .map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const listing = await getJobListingBySlug(slug)
  if (!listing) return { title: 'Role Not Found' }

  return {
    title: `${listing.title} — Careers at Sarwagyna`,
    description: listing.summary,
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold tracking-[0.14em] uppercase text-text-muted mb-5 pt-2">
      {children}
    </h2>
  )
}

function BulletList({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="space-y-2.5 mb-2">
      {items.map((item) => (
        <li
          key={item}
          className="text-[15px] text-text-secondary leading-[1.7] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-text-muted/50"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function ApplyBar({ href, title, summary }: { href: string; title: string; summary?: string }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 sm:mx-0 mt-10 border-t border-border-subtle bg-bg/95 backdrop-blur-sm px-4 sm:px-0 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-3 max-w-[720px]">
        <p className="text-[13px] text-text-muted truncate hidden sm:block min-w-0 flex-1">
          {title}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <CtaButton href={href} className="w-auto flex-1 sm:flex-none">
            Apply Now
          </CtaButton>
          <JobShareButton title={title} summary={summary} />
        </div>
      </div>
    </div>
  )
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = await getJobListingBySlug(slug)
  if (!listing) notFound()

  const applyHref = listing.applyUrl || DEFAULT_APPLY
  const metaBits = [
    listing.employmentType,
    listing.engagement,
    listing.location,
    listing.stipendOrCompensation,
  ].filter(Boolean)

  const closeDate = listing.applicationsCloseDate
    ? new Date(listing.applicationsCloseDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text pt-16">
      <article className="py-12 sm:py-16">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All roles
          </Link>

          <header className="mb-10 pb-8 border-b border-border-subtle">
            <span className="inline-block text-[11px] font-medium tracking-[0.08em] uppercase text-text-muted border border-border-subtle px-2 py-0.5 mb-5">
              {listing.employmentType}
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-text tracking-tight leading-[1.15] mb-5">
              {listing.title}
            </h1>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-5">
              {listing.summary}
            </p>
            <p className="text-[13px] text-text-muted">
              {metaBits.join(' · ')}
              {closeDate ? ` · Applications close ${closeDate}` : ''}
            </p>
            <div className="mt-6 flex items-center gap-2 sm:gap-3">
              <CtaButton href={applyHref} className="w-auto">
                Apply Now
              </CtaButton>
              <JobShareButton title={listing.title} summary={listing.summary} />
            </div>
          </header>

          <div className="space-y-12">
            {listing.aboutSarwagyna?.length ? (
              <section>
                <SectionHeading>About Sarwagyna</SectionHeading>
                <PortableText value={listing.aboutSarwagyna} components={careersPtComponents} />
              </section>
            ) : null}

            {listing.problemStatement?.length ? (
              <section>
                <SectionHeading>The Problem</SectionHeading>
                <PortableText value={listing.problemStatement} components={careersPtComponents} />
              </section>
            ) : null}

            {listing.roleOverview?.length ? (
              <section>
                <SectionHeading>Role Overview</SectionHeading>
                <PortableText value={listing.roleOverview} components={careersPtComponents} />
              </section>
            ) : null}

            {listing.keyResponsibilities?.length ? (
              <section>
                <SectionHeading>Key Responsibilities</SectionHeading>
                <div className="space-y-8">
                  {listing.keyResponsibilities.map((group) => (
                    <div key={group.groupTitle}>
                      {group.groupTitle ? (
                        <h3 className="text-[15px] font-semibold text-text mb-3">
                          {group.groupTitle}
                        </h3>
                      ) : null}
                      <BulletList items={group.bullets || []} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {listing.techStack?.length ? (
              <section>
                <SectionHeading>Tech Stack</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {listing.techStack.map((item) => (
                    <span
                      key={item}
                      className="text-[13px] text-text-secondary border border-border-subtle px-2.5 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {(listing.requirementsMandatory?.length ||
              listing.requirementsPreferred?.length ||
              listing.goodToHave?.length) && (
              <section>
                <SectionHeading>Requirements</SectionHeading>
                {listing.requirementsMandatory?.length ? (
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-text mb-3">Mandatory</h3>
                    <BulletList items={listing.requirementsMandatory} />
                  </div>
                ) : null}
                {listing.requirementsPreferred?.length ? (
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-text mb-3">Preferred</h3>
                    <BulletList items={listing.requirementsPreferred} />
                  </div>
                ) : null}
                {listing.goodToHave?.length ? (
                  <div>
                    <h3 className="text-[14px] font-semibold text-text mb-3">Good to have</h3>
                    <BulletList items={listing.goodToHave} />
                  </div>
                ) : null}
              </section>
            )}

            {listing.whoThisIsNotFor?.length ? (
              <section>
                <SectionHeading>Who This Is Not For</SectionHeading>
                <BulletList items={listing.whoThisIsNotFor} />
              </section>
            ) : null}

            {listing.whatYouGet?.length ? (
              <section>
                <SectionHeading>What You Get</SectionHeading>
                <BulletList items={listing.whatYouGet} />
              </section>
            ) : null}

            {listing.selectionProcess?.length ? (
              <section>
                <SectionHeading>Selection Process</SectionHeading>
                <ol className="space-y-5">
                  {listing.selectionProcess.map((stage, i) => (
                    <li key={stage.stage} className="flex gap-4">
                      <span className="text-[13px] font-semibold text-text-muted w-6 shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-text mb-1">{stage.stage}</h3>
                        {stage.description ? (
                          <p className="text-[14px] text-text-secondary leading-relaxed">
                            {stage.description}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {listing.applicationInstructions?.length ? (
              <section>
                <SectionHeading>Include in Your Application</SectionHeading>
                <PortableText
                  value={listing.applicationInstructions}
                  components={careersPtComponents}
                />
              </section>
            ) : null}
          </div>

          <ApplyBar href={applyHref} title={listing.title} summary={listing.summary} />
        </div>
      </article>
    </div>
  )
}
