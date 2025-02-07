/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/products/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */

import { client } from '@/sanity/lib/client';
import ProductClient from './clientProduct';
import { fetchProductBySlug } from '@/sanity/lib/queries';
import { Product } from '@/app/types/Product';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  try {
    // Await the params before destructuring
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    if (!slug) {
      console.error('No slug provided');
      return notFound();
    }

    const product = await fetchProductBySlug(slug);
    
    console.log('Fetched Product:', product);

    if (!product) {
      console.error(`No product found for slug: ${slug}`);
      return notFound();
    }

    return <ProductClient product={product} />;
  } catch (error) {
    console.error('Error in ProductPage:', error);
    return <div>Something went wrong. Please try again later.</div>;
  }
};

export async function generateStaticParams() {
  try {
    const query = groq`*[_type == "product"] {
      "slug": slug.current
    }`;

    const products = await client.fetch<Product[]>(query);
    
    if (!products || products.length === 0) {
      console.warn('No products found during static generation');
      return [];
    }

    return products.map((product) => ({
      slug: product.slug.current,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

// Force dynamic rendering if static generation fails
export const dynamic = 'force-dynamic';

// Add revalidation time
export const revalidate = 3600; // Revalidate every hour

export default ProductPage;