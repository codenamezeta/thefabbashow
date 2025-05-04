import {defineField, defineType} from 'sanity'
// import {EventNameInput} from '../components/EventNameInput'
// Your schema definition with the slug source function
// ...

export const eventType = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: () => '📅',
  preview: {
    select: {
      date: 'date',
      eventName: 'eventName',
      time: 'time',
      venueName: 'venue.name',
      media: 'eventImage',
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
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    }),
    defineField({
      name: 'time',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
    }),
    defineField({
      name: 'getTickets',
      title: 'Tickets Link',
      description:
        'A direct link to purchase tickets. Must include the protocol. (http://, https://, mailto:, tel:, or sms:)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel', 'sms'],
        }),
    }),
    defineField({
      name: 'price',
      type: 'string',
    }),
    defineField({
      name: 'soldOut',
      type: 'boolean',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const hasEventName = !!doc.eventName
          const hasDate = !!doc.date

          // Format the date if it exists (from YYYY-MM-DD to MM-DD-YYYY)
          let formattedDate = ''
          if (hasDate) {
            // Parse YYYY-MM-DD format
            const [year, month, day] = doc.date.split('-')
            formattedDate = `${month}-${day}-${year}`
          }

          // Build the slug source string based on available fields
          if (hasEventName && hasDate) {
            return `${doc.eventName}-${formattedDate}`
          } else if (hasEventName) {
            return doc.eventName
          } else if (hasDate) {
            return formattedDate
          } else {
            // If neither eventName nor date is available, use document ID
            return doc._id || ''
          }
        },
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .slice(0, 200),
      },
    }),
    defineField({
      name: 'eventName',
      type: 'string',
      title: 'Custom Event Name',
      description:
        'Override the defult event name. Leave blank for default name based on location.',
    }),
    defineField({
      name: 'eventImage',
      title: 'Event Image',
      description: 'The image that will be displayed as a banner on the event page.',
      type: 'image',
    }),
    defineField({
      name: 'description',
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
      // of: [
      //   {type: 'block'},
      //   {
      //     type: 'image',
      //     options: {
      //       hotspot: true, // Enables the hotspot positioning feature
      //     },
      //     icon: () => '🏞️',
      //     fields: [
      //       {
      //         name: 'alt',
      //         type: 'string',
      //         title: 'Alternative text',
      //         description: 'Important for accessibility and SEO',
      //       },
      //       {
      //         name: 'caption',
      //         type: 'string',
      //         title: 'Caption',
      //       },
      //     ],
      //   },
      //   // YouTube/Vimeo embed
      //   {
      //     type: 'object',
      //     name: 'videoEmbed',
      //     title: 'Video Embed',
      //     icon: () => '🎥',
      //     fields: [
      //       {
      //         name: 'url',
      //         type: 'url',
      //         title: 'URL',
      //         description: 'Paste YouTube or Vimeo URL',
      //       },
      //       {
      //         name: 'caption',
      //         type: 'string',
      //         title: 'Caption',
      //       },
      //     ],
      //   },
      //   // Audio embed
      //   {
      //     type: 'file',
      //     name: 'audioFile',
      //     title: 'Audio File',
      //     options: {
      //       accept: 'audio/*',
      //     },
      //     icon: () => '🔊',
      //     fields: [
      //       {
      //         name: 'title',
      //         type: 'string',
      //         title: 'Title',
      //       },
      //       {
      //         name: 'description',
      //         type: 'string',
      //         title: 'Description',
      //       },
      //     ],
      //   },
      // ],
      title: 'Event Description',
      description:
        "A rich text editor for the event's detailed description. Say whatever you want! This will appear on the event page, much like a blog post specific to this event.",
    }),
  ],
})
