import { CaseIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const jobListingType = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time', value: 'Full-Time' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Part-Time', value: 'Part-Time' },
          { title: 'Contract', value: 'Contract' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'engagement',
      title: 'Engagement',
      type: 'string',
      description: 'e.g. "Remote", "Remote / Flexible Hours / 3 Months", "6 weeks"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Remote (India)"',
    }),
    defineField({
      name: 'stipendOrCompensation',
      title: 'Stipend / Compensation',
      type: 'string',
    }),
    defineField({
      name: 'applicationsCloseDate',
      title: 'Applications Close',
      type: 'date',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      description: 'When off, this listing is hidden from the public careers page.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first on the listing page.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: '1–2 sentences shown on the listing card.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutSarwagyna',
      title: 'About Sarwagyna',
      type: 'blockContent',
    }),
    defineField({
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'blockContent',
    }),
    defineField({
      name: 'roleOverview',
      title: 'Role Overview',
      type: 'blockContent',
    }),
    defineField({
      name: 'keyResponsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'responsibilityGroup',
          title: 'Responsibility Group',
          fields: [
            defineField({
              name: 'groupTitle',
              title: 'Group Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'groupTitle', bullets: 'bullets' },
            prepare({ title, bullets }) {
              return {
                title: title || 'Untitled group',
                subtitle: `${bullets?.length ?? 0} items`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'requirementsMandatory',
      title: 'Requirements — Mandatory',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'requirementsPreferred',
      title: 'Requirements — Preferred',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'goodToHave',
      title: 'Good to Have',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'whoThisIsNotFor',
      title: 'Who This Is Not For',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'whatYouGet',
      title: 'What You Get',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'selectionProcess',
      title: 'Selection Process',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'selectionStage',
          title: 'Stage',
          fields: [
            defineField({
              name: 'stage',
              title: 'Stage',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'stage', subtitle: 'description' },
          },
        }),
      ],
    }),
    defineField({
      name: 'applicationInstructions',
      title: 'Application Instructions',
      description: 'Questions to answer / what to include in the application.',
      type: 'blockContent',
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      description: 'mailto: or https URL. Leave blank to fall back to mailto:sarwan@sarwagyna.com',
      type: 'string',
    }),
  ],

  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      employmentType: 'employmentType',
      isActive: 'isActive',
      location: 'location',
    },
    prepare({ title, employmentType, isActive, location }) {
      const status = isActive === false ? 'Inactive' : 'Active'
      return {
        title,
        subtitle: [status, employmentType, location].filter(Boolean).join(' · '),
      }
    },
  },
})
