/* eslint-disable import/no-anonymous-default-export */
// category.js

const categories = [
  { value: 'show', title: 'Show' },
  { value: 'rehearsal', title: 'Rehearsal' },
  { value: 'private', title: 'Private Event' },
  { value: 'virtual', title: 'Virtual' },
  { value: 'mediaShoot', title: 'Media Shoot' },
  { value: 'other', title: 'Other' },
]

export default {
  name: 'category',
  title: 'Categories',
  type: 'string',
  options: {
    list: categories,
  },
}
