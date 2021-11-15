/* eslint-disable import/no-anonymous-default-export */
// organizer.js

export default {
  name: 'organizer',
  title: 'Organizers',
  type: 'document',
  description: 'An organizer',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
  ],
}
