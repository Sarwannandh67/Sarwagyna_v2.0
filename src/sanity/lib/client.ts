import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Optional Viewer token. Prefer undotted document IDs for public content —
// this project's anonymous ACL only allows `_id in path("*")` (no dots).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})
