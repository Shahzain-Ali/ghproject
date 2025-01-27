/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-16'
})

// Optimal batch size for stability and speed
const BATCH_SIZE = 10;
const CONCURRENT_BATCHES = 3; // Process 3 batches at a time

async function uploadImageToSanity(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { 
      responseType: 'arraybuffer',
      timeout: 10000 // 10 second timeout
    });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    return asset._id;
  } catch (error) {
    console.error(`Image upload failed for ${imageUrl}`);
    return null;
  }
}

async function processProduct(item) {
  try {
    let imageRef = null;
    if (item.imagePath) {
      imageRef = await uploadImageToSanity(item.imagePath);
    }

    const sanityItem = {
      _type: 'product',
      name: item.name,
      category: item.category || null,
      price: item.price,
      description: item.description || '',
      discountPercentage: item.discountPercentage || 0,
      stockLevel: item.stockLevel || 0,
      isFeaturedProduct: item.isFeaturedProduct,
      image: imageRef
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef,
            },
          }
        : undefined,
    };

    const result = await client.create(sanityItem);
    console.log(`✓ Uploaded: ${item.name}`);
    return result;
  } catch (error) {
    console.error(`✗ Failed: ${item.name}`);
    return null;
  }
}

// Process multiple batches concurrently
async function processBatches(batches, startIndex, endIndex) {
  const batchPromises = batches.slice(startIndex, endIndex).map(async (batch) => {
    return Promise.all(batch.map(item => processProduct(item)));
  });
  return Promise.all(batchPromises);
}

async function importData() {
  try {
    console.log('Fetching Product Data From API...');
    const response = await axios.get("https://next-ecommerce-template-4.vercel.app/api/product");
    const products = response.data.products;

    // Split products into batches
    const batches = [];
    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      batches.push(products.slice(i, i + BATCH_SIZE));
    }

    console.log(`Total products: ${products.length}`);
    console.log(`Number of batches: ${batches.length}`);

    let processedCount = 0;
    let successCount = 0;

    // Process batches in groups
    for (let i = 0; i < batches.length; i += CONCURRENT_BATCHES) {
      const endIndex = Math.min(i + CONCURRENT_BATCHES, batches.length);
      console.log(`\nProcessing batches ${i + 1} to ${endIndex} of ${batches.length}`);
      
      const results = await processBatches(batches, i, endIndex);
      
      // Count successful uploads
      results.forEach(batchResult => {
        const batchSuccesses = batchResult.filter(result => result !== null).length;
        successCount += batchSuccesses;
        processedCount += batchResult.length;
      });

      console.log(`Progress: ${processedCount}/${products.length} (${successCount} successful)`);
      
      // Small delay between batch groups to prevent overload
      if (endIndex < batches.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\nImport Complete!');
    console.log(`Successfully uploaded ${successCount} out of ${products.length} products`);

  } catch (error) {
    console.error('Error Importing Data:', error);
  }
}

importData();