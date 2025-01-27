  import React from 'react';
  import { notFound } from 'next/navigation';
  import { client } from '@/sanity/lib/client';
  import { fetchProductBySlug } from '@/sanity/lib/queries';
  import ProductClient from './clientProduct';
  import { groq } from 'next-sanity';

  interface ProductPageParams {
    slug: string; // Changed from string to match Sanity's slug structure
  }

  const ProductPage = async ({ params }: { params: ProductPageParams }) => {
    const { slug } = params;
    
    try {
      const product = await fetchProductBySlug(slug);
      
      console.log('Fetched Product:', JSON.stringify(product, null, 2));
      
      if (!product) {
        notFound();
      }
      
      return <ProductClient product={product} />;
    } catch (error) {
      console.error('Error fetching product:', error);
      notFound();
    }
  };
  export async function generateStaticParams() {
    const query = groq`*[_type == "product"]{ "slug": slug.current }`;
    const products = await client.fetch(query);
    
    return products.map((product: { slug: string }) => ({
      slug: product.slug
    }));
  }

  export default ProductPage;
