import {defineField, defineType} from 'sanity'

export const venueType = defineType({
  name: 'venue',
  title: 'Venues',
  type: 'document',
  preview: {
    select: {
      location: 'address.city',
      state: 'address.state',
      venueName: 'name',
      media: 'image',
    },
    prepare({venueName, location, state, media}) {
      // Build subtitle with available fields
      const subtitle = [location, state].filter(Boolean).join(', ')

      return {
        title: venueName || 'No name',
        subtitle: subtitle || 'No details',
        media: media,
      }
    },
  },
  icon: () => '🪩',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
        }),
        defineField({
          name: 'lineTwo',
          type: 'string',
        }),
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
        defineField({
          name: 'zip',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'website',
      type: 'url',
    }),
    defineField({
      name: 'mapsLink',
      type: 'url',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    // defineField({
    //   name: 'parking',
    //   type: 'text',
    // }),
    // defineField({
    //   name: 'description',
    //   type: 'text',
    // }),
    defineField({
      name: 'events',
      type: 'reference',
      to: [{type: 'event'}],
    }),
  ],
})
