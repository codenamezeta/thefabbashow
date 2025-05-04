import {defineField, defineType} from 'sanity'
// Your schema definition with the slug source function
// ...

export const postType = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({title, media, publishedAt}) {
      return {
        title: title || 'Untitled',
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Unpublished',
        media: media,
      }
    },
  },
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const hasTitle = !!doc.title
          return hasTitle ? doc.title : 'untitled'
        },
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            // Keep default annotations like strong, em, etc.
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strikethrough', value: 'strike-through'},
              // {title: 'Code', value: 'code'},
            ],
            // Define custom annotations for inline references
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'Link',
                icon: () => '🔗',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'Enter the URL to link to. You must include http:// or https://',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: false,
                        scheme: ['http', 'https'],
                      }),
                  },
                ],
                preview: {
                  select: {
                    title: 'href',
                  },
                  prepare({title}) {
                    return {
                      title: title || 'Link',
                      subtitle: 'Click to open link',
                    }
                  },
                },
              },
              {
                type: 'object',
                name: 'eventReference',
                title: 'Event Reference (Inline)',
                icon: () => '📅',
                fields: [
                  {
                    name: 'event',
                    type: 'reference',
                    to: [{type: 'event'}],
                    title: 'Select Event',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Image',
          icon: () => '🏞️', // Optional: add an icon
          options: {
            hotspot: true, // Enables the hotspot positioning feature
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        // YouTube/Vimeo embed
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          icon: () => '🎥', // Optional: add an icon
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'Paste YouTube or Vimeo URL',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        // Audio embed
        {
          type: 'file',
          name: 'audioFile',
          title: 'Audio File',
          description: 'Upload an audio file (e.g., MP3)',
          icon: () => '🔊', // Optional: add an icon
          options: {
            accept: 'audio/*',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
        {
          type: 'object',
          name: 'eventReference',
          title: 'Event Reference',
          icon: () => '📅', // Optional: add an icon
          fields: [
            {
              name: 'event',
              type: 'reference',
              to: [{type: 'event'}], // Reference to your event document type
              title: 'Select Event',
            },
            {
              name: 'displayStyle',
              type: 'string',
              title: 'Display Style',
              options: {
                list: [
                  {title: 'Card', value: 'card'},
                  // {title: 'Inline', value: 'inline'},
                  {title: 'Full', value: 'full'},
                ],
              },
              initialValue: 'card',
            },
          ],
          preview: {
            select: {
              date: 'event.date',
              eventName: 'event.eventName',
              time: 'event.time',
              venueName: 'event.venue.name',
              media: 'event.eventImage',
            },
            prepare({date, eventName, time, venueName, media}) {
              // Format date for display
              const formattedDate = date
                ? new Date(`${date}T12:00:00`).toDateString() // Add noon time to prevent date shifting
                : 'No date'

              // Build subtitle with available fields
              const subtitle = [eventName, venueName, time].filter(Boolean).join(' | ')

              return {
                title: formattedDate,
                subtitle: subtitle || 'No details',
                media: media,
              }
            },
          },
        },
      ],
      title: 'Post Body',
      description: 'A rich text editor for the post\'s main content or "body".',
    }),
  ],
})
