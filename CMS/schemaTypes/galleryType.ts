import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'galleryItem',
  title: 'Gallery Items',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      imageAsset: 'imageContent.asset',
      videoAsset: 'videoContent.asset',
    },
    prepare({title, mediaType, imageAsset, videoAsset}) {
      return {
        title: title || 'No title',
        subtitle: mediaType === 'image' ? 'Image' : 'Video',
        media: mediaType === 'image' ? imageAsset : videoAsset,
      }
    },
  },
  icon: () => '🏞️',
  fields: [
    defineField({
      name: 'mediaType',
      type: 'string',
      title: 'Media Type',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      description: 'Select the type of media for this item before uploading.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageContent',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true, // Enables UI for selecting focal points
      },
      hidden: ({document}) => document?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.mediaType === 'image' && !field) {
            return 'Image is required when media type is image'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoContent',
      type: 'file',
      title: 'Video',
      options: {
        accept: 'video/*',
      },
      hidden: ({document}) => document?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.mediaType === 'video' && !field) {
            return 'Video is required when media type is video'
          }
          return true
        }),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Caption',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Important for accessibility and SEO',
    }),
  ],
})

// import {defineField, defineType} from 'sanity'

// export const galleryType = defineType({
//   name: 'galleryItem',
//   title: 'Gallery Item',
//   type: 'document',
//   preview: {
//     select: {
//       title: 'title',
//       media: 'media',
//     },
//     prepare({title, media}) {
//       return {
//         title: title || 'No title',
//         media: media, //! Don't use a fallback string here!
//       }
//     },
//   },
//   // icon: () => '🖼️',
//   fields: [
//     defineField({
//       name: 'title',
//       type: 'string',
//       title: 'Title',
//     }),
//     defineField({
//       name: 'media',
//       type: 'file',
//       title: 'Media Item',
//       fields: [
//         {
//           name: 'mediaType',
//           type: 'string',
//           title: 'Media Type',
//           options: {
//             list: [
//               {title: 'Image', value: 'image'},
//               {title: 'Video', value: 'video'},
//             ],
//           },
//         },
//       ],
//       options: {
//         accept: 'image/*,video/*',
//       },
//     }),
//     defineField({
//       name: 'description',
//       type: 'text',
//       title: 'Description',
//     }),
//   ],
// })
