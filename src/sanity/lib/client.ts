import { createClient } from 'next-sanity';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn("Sanity credentials not properly loaded");
}

export const client = createClient({
  projectId: 'kkab2my1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-16'
});