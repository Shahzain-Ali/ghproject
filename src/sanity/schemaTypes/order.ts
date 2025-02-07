import { defineType, defineField } from 'sanity'

export const checkoutSchema = defineType({
  name: 'checkout',
  title: 'Checkout',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'firstName',
      type: 'string',
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      type: 'string',
      validation: Rule => Rule.required().min(5)
    }),
    defineField({
      name: 'apartment',
      type: 'string'
    }),
    defineField({
      name: 'city',
      type: 'string',
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'postalCode',
      type: 'string',
      validation: Rule => Rule.required().min(4)
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      readOnly: true
    })
  ]
})