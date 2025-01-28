import { groq } from "next-sanity"
import { client } from "./client"
import { Product } from "@/app/types/Product"

export const getHeroProduct = groq`*[_type == "product" && isFeaturedProduct == true][0] `

export const getLuxurySofa = groq`*[_type == "product" && name == "Luxury Flower Shell Sofa Chair"][0] {
    name,
    image,
    price,
    description,
    discountPercentage,
    category
  }`

  export async function fetchProductBySlug(slug: string): Promise<Product | null> {
    const query = groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      description,
      price,
      image {
        asset-> {
          _id,
          url
        }
      },
      slug,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category,
      _createdAt,
      _updatedAt
    }`;
  
    try {
      return await client.fetch<Product | null>(query, { slug });
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }


export const getLatestProduct = groq `*[_type == "product" && name in ["Matilda Velvet Chair – Pink", "Rapson Thirty-Nine Guest Chair", "Varmora Plastic Chair Solid","Cozy Armchair"]] {
    name,
    image {
      asset-> {
        _id,
        url
      }
    },
    price,
    description,
    discountPercentage,
    category,
    slug {
      current
    }
}
  `
export const getBlueSofa = groq` *[_type == "product" && name == "Stylish Golden Metal Legs Mint Blue Fabric Velvet Sofa Leisure Armchair"] {

    name,
    image,
    price,
    description,
    discountPercentage,
    category

}`

export const getDiscountItems = groq  `*[_type == "product" && name in ["Armchair Tortuga"]] {
    name,
    image {
      asset-> {
        _id,
        url
      }
    },
    price,
    description,
    discountPercentage,
    category,
    slug {
      current
    }
}
 `

 export const getTopCategories = groq`
 *[_type == "product" && name in ["Cantilever Chair", "High Quality Modern Customized Plastic Chair", "Varmora Plastic Chair Solid", "Cantilever Chair"]] {
   name,
   image {
     asset-> {
       _id,
       url
     }
   },
   price,
   description,
   discountPercentage,
   category,
   slug {
     current
   }
}
`;
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const query = groq`*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      price,
      "image": image {
        asset-> {
          _id,
          url
        }
      },
      slug {
        current
      },
      description,
      category,
      _createdAt,
      _updatedAt
    }`;

    console.log('Fetching products with query:', query);
    const products = await client.fetch(query);
    console.log('Fetched Products:', products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchAllProducts();
    console.log('Fetched Products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchHeroProduct = async (): Promise<Product> => {
  return await client.fetch(getHeroProduct);
};

export const fetchProductsByNames = async (names: string[]): Promise<Product[]> => {
  const query = groq`*[_type == "product" && name in $names] {
       name,
    image {
      asset-> {
        _id,
        url
      }
    },
    price,
    description,
    discountPercentage,
    category,
    slug {
      current
    }
  }`;
  return await client.fetch(query, { names });
};

export const fetchProductsByCategory = async (
  categoryName: string
): Promise<Product[]> => {
  const query = `*[_type == "product" && category->name == $categoryName] | order(_createdAt desc) {
    _id,
      name,
      price,
      "image": image {
        asset-> {
          _id,
          url
        }
      },
      slug {
        current
      },
      description,
      category,
      _createdAt,
      _updatedAt
  }`;

  return await client.fetch(query, { categoryName });
};

export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  return await fetchProductsByCategory(categoryName);
};

// In your queries.ts file
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  const query = groq`*[_type == "product" && 
    (
      lower(name) match lower($searchTerm) || 
      lower(description) match lower($searchTerm) || 
      lower(category) match lower($searchTerm)
    )
  ] {
    _id,
    name,
    price,
    "image": image {
      asset-> {
        _id,
        url
      }
    },
    slug {
      current
    },
    description,
    category,
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
};
