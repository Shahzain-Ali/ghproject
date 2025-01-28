import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'kkab2my1',
  dataset: 'production',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-16'
});