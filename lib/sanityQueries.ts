// /lib/sanityQueries.ts
import client from './sanityClient' // Adjust the path if needed
import { PortableTextBlock } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type EventType = {
  _id: string
  eventName?: string
  date?: string
  time?: string
  venue?: {
    name?: string
    address?: {
      street?: string
      lineTwo?: string
      city?: string
      state?: string
      zip?: string | number
    }
  }
  description?: PortableTextBlock[]
  price?: string
  soldOut?: boolean
  getTickets?: string
  slug?: string
  thumbnail?: {
    url?: string
    alt?: string
  }
}
export type GalleryItemType = {
  _id: string
  title?: string
  media?: {
    url?: string
    alt?: string
    type?: string
  }
  description?: PortableTextBlock[]
}
export type AudioTrackType = {
  _id: string
  title?: string
  src?: string
}
export type PostType = {
  _id: string
  title?: string
  slug?: {
    current?: string
  }
  publishedAt?: string
  mainImage?: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        dimensions?: {
          width?: number
          height?: number
        }
      }
    }
    alt?: string
  }
  body?: PortableTextBlock[]
  categories?: {
    title?: string
    slug?: string
  }[]
}
export type CategoryType = {
  _id: string
  title?: string
  slug?: string
  posts?: PostType[]
}

const builder = imageUrlBuilder(client)

// Function for image URLs with transformations
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

// Function for file asset URLs (audio, etc.)
export function urlForFile(ref: string): string {
  if (!ref) return ''
  // Parse the reference string (format: file-<id>-<extension>)
  const [, id, extension] = ref.split('-')
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`
}

export async function getAllEvents() {
  const query = `*[_type == "event"] | order(date asc) {
    _id,
    eventName,
    date,
    time,
    venue->{
      name,
      address,
    },
    price,
    soldOut,
    getTickets,
    "slug": slug.current,
    "thumbnail": eventImage.asset->{url, alt}
  }`

  try {
    const allEvents = await client.fetch(query)
    return allEvents
  } catch (error) {
    console.error('Error fetching events from Sanity:', error)
    return [] // Return an empty array on error
  }
}

export async function getNextEvents(amount: number) {
  const query = `*[_type == "event" && date > now()] | order(date asc) [0...$amount] {
    _id,
    eventName,
    date,
    time,
    venue->{
      name,
      address,
    },
    price,
    soldOut,
    getTickets,
    "slug": slug.current,
    "thumbnail": eventImage.asset->{url, alt}
  }`

  try {
    const nextEvents = await client.fetch(query, { amount }) //* Pass amount as a parameter
    // console.log(`Next ${amount} events:`, nextEvents)

    return nextEvents
  } catch (error) {
    console.error('Error fetching next event from Sanity:', error)
    return null // Return null on error
  }
}

export async function getEvent(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    eventName,
    date,
    time,
    venue->{
      name,
      address,
    },
    price,
    soldOut,
    getTickets,
    "slug": slug.current,
    "thumbnail": eventImage.asset->{url, alt},
    description
  }`

  try {
    const event = await client.fetch(query, { slug }) //* Pass slug as a parameter
    console.log('Event:', event)

    return event
  } catch (error) {
    console.error('Error fetching next event from Sanity:', error)
    return null // Return null on error
  }
}

export async function getGalleyItems() {
  const query = `
    *[_type == "galleryItem"] | order(_createdAt desc) {
      _id,
      title,
      description,
      mediaType,
      alt,
      "imageContent": imageContent {
        asset->
      },
      "videoContent": videoContent {
        asset->
      }
    }
  `

  try {
    const galleryItems = await client.fetch(query)
    return galleryItems
  } catch (error) {
    console.error('Error fetching gallery items from Sanity:', error)
    return [] // Return an empty array on error
  }
}

export async function getAudioTracks() {
  const query = `*[_type == "audioTrack"] | order(_createdAt asc) {
    _id,
    title,
    "src": file.asset->url
  }`

  try {
    const audioTracks = await client.fetch(query)
    return audioTracks
  } catch (error) {
    console.error('Error fetching audio tracks from Sanity:', error)
    return [] // Return an empty array on error
  }
}

export async function checkForAudioTracks() {
  const query = `*[_type == "audioTrack"] {
    _id,
  }`

  try {
    const audioTracks = await client.fetch(query)
    return audioTracks
  } catch (error) {
    console.error('Error checking for audio tracks from Sanity:', error)
    return [] // Return an empty array on error
  }
}

export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage{
      asset->{
        _id,
        url,
      },
      alt,
    },
    categories[]->{
      title,
      slug
    }
  }`

  try {
    const allPosts = await client.fetch(query)
    return allPosts
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    return [] // Return an empty array on error
  }
}
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    slug{
      current
    },
    body[]{
      ...,
      _type == "eventReference" => {
        ...,
        event->{
          _id,
          eventName,
          date,
          time,
          venue->{
            name,
            address,
          },
          price,
          soldOut,
          getTickets,
          "slug": slug.current,
          "thumbnail": eventImage.asset->{url, alt},
          description
        }
      },
      markDefs[]{
        ...,
        _type == "eventReference" => {
          ...,
          event->{
            _id,
            eventName,
            date,
            time,
            venue->{
              name,
              address,
            },
            price,
            soldOut,
            getTickets,
            "slug": slug.current,
            "thumbnail": eventImage.asset->{url, alt},
            description
          }
        },
      }
    },
    mainImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    }
  }`

  try {
    const post = await client.fetch(query, { slug }) //* Pass slug as a parameter
    return post
  } catch (error) {
    console.error('Error fetching post from Sanity:', error)
    return null // Return null on error
  }
}
export async function getAllCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }`

  try {
    const allCategories = await client.fetch(query)
    return allCategories
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error)
    return [] // Return an empty array on error
  }
}
export async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    posts[]->{
      _id,
      title,
      slug,
      publishedAt,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }`

  try {
    const category = await client.fetch(query, { slug }) //* Pass slug as a parameter
    return category
  } catch (error) {
    console.error('Error fetching category from Sanity:', error)
    return null // Return null on error
  }
}
export async function getPostById(id: string) {
  const query = `*[_type == "post" && _id == $id][0] {
    _id,
    title,
    publishedAt,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    body,
    categories[]->{
      title,
      slug
    }
  }`

  try {
    const post = await client.fetch(query, { id }) //* Pass id as a parameter
    return post
  } catch (error) {
    console.error('Error fetching post from Sanity:', error)
    return null // Return null on error
  }
}
