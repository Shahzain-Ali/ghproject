/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/products/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */

import { client } from '@/sanity/lib/client';
import ProductClient from './clientProduct';
import { fetchProductBySlug } from '@/sanity/lib/queries';
import { Product } from '@/app/types/Product';
import { groq } from 'next-sanity';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // Await the params before destructuring
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const product = await fetchProductBySlug(slug);

  console.log('Fetched Product:', product);


  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductClient product={product} />;
};

export async function generateStaticParams() {
  const query = groq`*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch<Product[]>(query);
  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default ProductPage;