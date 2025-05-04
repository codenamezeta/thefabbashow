import {defineField, defineType} from 'sanity'

export const audioType = defineType({
  name: 'audioTrack',
  title: 'Audio Tracks',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      file: 'file.asset.originalFilename',
    },
    prepare({title, file}) {
      return {
        title: title || 'Untitled',
        subtitle: file || 'No file selected',
      }
    },
  },
  icon: () => '🔊',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'Audio File',
      options: {
        accept: '.mp3,.wav,.ogg,.flac',
      },
    }),
  ],
})
