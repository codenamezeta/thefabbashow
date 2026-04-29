// /lib/sanityClient.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-29', // Or a more recent date if you updated it
  // Published API only; disable CDN if stale documents after edits (set NEXT_PUBLIC_SANITY_USE_CDN=false).
  useCdn:
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_SANITY_USE_CDN !== 'false',
})

export default client
