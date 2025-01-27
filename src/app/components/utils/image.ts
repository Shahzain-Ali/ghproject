/* eslint-disable @typescript-eslint/no-explicit-any */
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  // Check if source exists and has a valid reference
  if (!source || !source.asset || !source.asset._ref) {
    console.warn('Invalid image source:', source);
    return '';
  }

  try {
    return builder.image(source).url() || '';
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
}