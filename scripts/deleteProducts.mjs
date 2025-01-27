import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
})

async function deleteAllProducts() {
  try {
    // First, get all product document IDs
    const query = `*[_type == "product"]._id`
    const productIds = await client.fetch(query)
    
    console.log(`Found ${productIds.length} products to delete`)
    
    // Delete products in batches of 10
    const batchSize = 10
    for (let i = 0; i < productIds.length; i += batchSize) {
      const batch = productIds.slice(i, i + batchSize)
      const transaction = client.transaction()
      
      batch.forEach(id => {
        transaction.delete(id)
      })
      
      await transaction.commit()
      console.log(`Deleted batch ${i / batchSize + 1}/${Math.ceil(productIds.length / batchSize)}`)
    }
    
    console.log('All products deleted successfully!')
  } catch (error) {
    console.error('Error deleting products:', error)
  }
}

deleteAllProducts()