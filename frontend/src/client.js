import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'r77nohvp',
  dataset: 'production',
  apiVersion: '2021-10-23', // use current UTC date - see "specifying API version"!
  // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
