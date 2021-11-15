/* eslint-disable import/no-anonymous-default-export */
// event.js

export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  description: 'An event',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      description:
        "A short name for the event. If you're not sure, put the city's name.",
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [
        {
          type: 'venue',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'start',
      title: 'Start date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'end',
      title: 'End date',
      type: 'datetime',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description:
        "This might be a Facebook event link or maybe the venue's event page.",
    },
    {
      name: 'category',
      title: 'Category',
      type: 'category',
      description:
        "Only events with a category of 'Show' will appear on the website.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description:
        'A short & catchy teaser for this event. No more than 2–3 sentences.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'A detailed description of the event.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image relevant to the event.',
    },
    {
      name: 'organizer',
      title: 'Organizer',
      type: 'reference',
      to: [
        {
          type: 'organizer',
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      description: 'This can be used to share the event in a URL.',
    },
  ],
  orderings: [
    {
      title: 'Event name',
      name: 'eventNameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Event date',
      name: 'eventDateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'organizer.name',
      media: 'image',
    },
  },
}
