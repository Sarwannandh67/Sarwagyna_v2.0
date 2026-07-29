export type EmploymentType = 'Full-Time' | 'Internship' | 'Part-Time' | 'Contract'

export type PortableTextBlock = {
  _type: string
  _key?: string
  [key: string]: unknown
}

export type ResponsibilityGroup = {
  _key?: string
  groupTitle: string
  bullets: string[]
}

export type SelectionStage = {
  _key?: string
  stage: string
  description?: string
}

export type JobListingCard = {
  _id: string
  title: string
  slug: string
  employmentType: EmploymentType
  engagement?: string
  location?: string
  stipendOrCompensation?: string
  applicationsCloseDate?: string
  summary: string
  sortOrder?: number
}

export type JobListingDetail = JobListingCard & {
  aboutSarwagyna?: PortableTextBlock[]
  problemStatement?: PortableTextBlock[]
  roleOverview?: PortableTextBlock[]
  keyResponsibilities?: ResponsibilityGroup[]
  techStack?: string[]
  requirementsMandatory?: string[]
  requirementsPreferred?: string[]
  goodToHave?: string[]
  whoThisIsNotFor?: string[]
  whatYouGet?: string[]
  selectionProcess?: SelectionStage[]
  applicationInstructions?: PortableTextBlock[]
  applyUrl?: string
}
