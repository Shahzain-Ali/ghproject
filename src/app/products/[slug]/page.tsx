/* eslint-disable @typescript-eslint/no-explicit-any */


import { client } from '@/sanity/lib/client';
import ProductClient from './clientProduct';
import { fetchProductBySlug } from '@/sanity/lib/queries';


// Generate static params
const ProductPage = async ({ params }:any) => {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);

  console.log('Fetched Product:', product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductClient product={product} />;
};

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  return products.map((product: { slug: { current: any; }; }) => ({
    params: { slug: product.slug.current },
  }));
}

export default ProductPage;
