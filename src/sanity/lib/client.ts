import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Required: this project's Content Lake only returns jobListing docs to
  // authenticated requests (public queries return []). Posts remain public.
  token: process.env.SANITY_API_READ_TOKEN,
})
