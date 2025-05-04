// /lib/sanityClient.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-29', // Or a more recent date if you updated it
  useCdn: process.env.NODE_ENV === 'production', // Keep this for dynamic CDN usage
  // OR, if you want to force no CDN for development for now, use:
  // useCdn: false,
})

export default client
