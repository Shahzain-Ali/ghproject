import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-02-07', // Use current date
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN // Include if you need authenticated requests
})