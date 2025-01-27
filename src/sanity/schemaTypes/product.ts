import { defineType, defineField } from 'sanity';

const productSchema = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 200,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image of the product.',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.required().error('Price is required'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) =>
        Rule.max(150).warning('Keep the description under 150 characters.'),
    }),
    defineField({
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      validation: (Rule) =>
        Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
    }),
    defineField({
      name: 'isFeaturedProduct',
      type: 'boolean',
      title: 'Is Featured Product',
    }),
    defineField({
      name: 'stockLevel',
      type: 'number',
      title: 'Stock Level',
      validation: (Rule) => Rule.min(0).error('Stock level must be a positive number.'),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Chair', value: 'Chair' },
          { title: 'Sofa', value: 'Sofa' },
        ],
      },
      validation: (Rule) => Rule.required().error('Category is required'),
    }),
  ],
});
export default productSchema;