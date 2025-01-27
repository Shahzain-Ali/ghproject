import { type SchemaTypeDefinition } from 'sanity'
import { Category } from './category'
import productSchema from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Category,productSchema],
}
