import Image from 'next/image'
import { urlForImage, urlForFile } from '@/lib/sanityQueries'
import Link from 'next/link'
import styles from './PortableTextComponents.module.css'
import Button from './Button'
import EventTeaser from './EventTeaser'

import { EventType } from '@/lib/sanityQueries'

// Types for component props
interface ImageProps {
  value: {
    asset?: {
      _ref?: string
    }
    alt?: string
    caption?: string
  }
}

interface VideoEmbedProps {
  value: {
    url?: string
    caption?: string
  }
}

interface AudioProps {
  value: {
    asset?: {
      _ref?: string
    }
    title?: string
    description?: string
  }
}

interface EventReferenceProps {
  value?: {
    event: EventType
    displayStyle?: 'card' | 'inline' | 'full'
  }
  markType?: string
  children?: React.ReactNode
}

interface VenueReferenceProps {
  value?: {
    venue: {
      _ref: string
      _id?: string
      name?: string
      location?: string
      slug?: { current: string }
      mainImage?: { asset: { _ref: string } }
      description?: string
    }
    displayStyle?: 'card' | 'inline' | 'full'
  }
  markType?: string
  children?: React.ReactNode
}

// Component for rendering embedded images
const ImageComponent = ({ value }: ImageProps) => {
  if (!value?.asset?._ref) {
    return null
  }

  return (
    <figure className={styles.figure}>
      <Image
        src={urlForImage(value).width(800).url()}
        alt={value.alt || ''}
        width={1000}
        height={800}
        className={styles.image}
        style={{ objectFit: 'contain' }}
      />
      {value.caption && (
        <figcaption className={styles.figureCaption}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Component for rendering video embeds
const VideoEmbedComponent = ({ value }: VideoEmbedProps) => {
  if (!value?.url) {
    return null
  }

  // Extract video ID from YouTube or Vimeo URL
  let embedUrl

  if (value.url.includes('youtube.com') || value.url.includes('youtu.be')) {
    const videoId = value.url.includes('v=')
      ? value.url.split('v=')[1].split('&')[0]
      : value.url.split('/').pop()
    embedUrl = `https://www.youtube.com/embed/${videoId}`
  } else if (value.url.includes('vimeo.com')) {
    const videoId = value.url.split('/').pop()
    embedUrl = `https://player.vimeo.com/video/${videoId}`
  }

  if (!embedUrl) return null

  return (
    <figure className={styles.figure}>
      <div className={styles.videoContainer}>
        <iframe
          src={embedUrl}
          width='100%'
          height='100%'
          title='Video Embed'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          frameBorder='0'
          allowFullScreen
          className={styles.videoFrame}
        />
      </div>
      {value.caption && (
        <figcaption className={styles.figureCaption}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Component for rendering audio files
const AudioComponent = ({ value }: AudioProps) => {
  if (!value?.asset?._ref) {
    return null
  }

  // Get URL from Sanity file asset
  const audioUrl = urlForFile(value.asset._ref)

  return (
    <figure className={styles.figure}>
      <div className={styles.audioContainer}>
        <h4 className={styles.audioTitle}>{value.title || 'Audio'}</h4>
        {value.description && (
          <p className={styles.audioDescription}>{value.description}</p>
        )}
        <audio controls className={styles.audioPlayer}>
          <source src={audioUrl} type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      </div>
    </figure>
  )
}

// Component for rendering event references
const EventReferenceComponent = ({
  value,
  markType,
  children,
}: EventReferenceProps) => {
  // console.log('EventReference value:', value)

  if (!value) return null

  // // Handle the case where event is just a reference
  // if (value.event && value.event._ref && !value.event._id) {
  //   // This is an unexpanded reference (likely from an annotation)
  //   // When you see this structure, it means your GROQ query isn't expanding the reference
  //   return (
  //     <Link className={styles.eventReferenceInline} href='#'>
  //       {children || 'Event'}
  //     </Link>
  //   )
  // }

  // Get the event data - could be from a block reference or an expanded annotation
  const event = value.event
  if (!event) return null

  // Extract data with proper fallbacks
  const eventTitle = event.eventName
  const eventUrl = event.slug ? `/events/${event.slug}` : '#'
  const eventImage = event.thumbnail || null
  const eventDate = event.date ? event.date : null

  // Handle inline display
  const isInline =
    markType === 'eventReference' || value.displayStyle === 'inline'
  if (isInline) {
    return (
      <Link className={styles.eventReferenceInline} href={eventUrl}>
        {children || eventTitle}
      </Link>
    )
  }

  // Handle card display
  if (value.displayStyle === 'card') {
    return (
      <div className={`${styles.eventReference} ${styles.eventReferenceCard}`}>
        {/* <Link href={eventUrl}> */}
        <div className={styles.eventCardContent}>
          {eventDate && (
            <time dateTime={eventDate} className={styles.eventCardDate}>
              {new Date(eventDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {eventTitle && (
            <h4 className={styles.eventCardTitle}>{eventTitle}</h4>
          )}
          {eventImage?.url && (
            <div className={styles.eventImageContainer}>
              <Image
                src={eventImage?.url}
                alt={eventImage?.alt || eventTitle || 'Event image'}
                width={300}
                height={200}
                className='object-cover'
              />
            </div>
          )}
          {event.venue?.address && (
            <h4 className={styles.eventCardLocation}>
              {event.venue?.address?.city}, {event.venue?.address?.state}
            </h4>
          )}
          {event.venue && (
            <h5 className={styles.eventCardLocation}>
              {event.venue?.name || 'Venue'}
            </h5>
          )}
          {event.price && (
            <p className={styles.eventCardPrice}>
              {event.soldOut ? 'Sold Out!' : event.price}
            </p>
          )}
          <Button variant='primary' className={styles.eventButton} fullWidth>
            View Event Details
          </Button>
        </div>
        {/* </Link> */}
      </div>
    )
  }

  // Default to full display
  return (
    <EventTeaser event={event} />
    // <div className={`${styles.eventReference} ${styles.eventReferenceFull}`}>
    //   {event.mainImage && (
    //     <div className={styles.eventImageContainer}>
    //       <Image
    //         src={urlForImage(event.mainImage).width(600).url()}
    //         alt={eventTitle}
    //         fill
    //         className='object-cover'
    //       />
    //     </div>
    //   )}
    //   <div className={styles.eventFullContent}>
    //     <h3 className={styles.eventFullTitle}>{eventTitle}</h3>
    //     {event.date && (
    //       <p className={styles.eventFullDate}>
    //         {new Date(event.date).toLocaleDateString('en-US', {
    //           weekday: 'long',
    //           year: 'numeric',
    //           month: 'long',
    //           day: 'numeric',
    //         })}
    //       </p>
    //     )}
    //     {event.description && (
    //       <p className={styles.eventFullDescription}>{event.description}</p>
    //     )}
    //     <Link href={eventUrl} className={styles.eventButton}>
    //       View Event Details
    //     </Link>
    //   </div>
    // </div>
  )
}

// Component for rendering venue references
const VenueReferenceComponent = ({
  value,
  markType,
  children,
}: VenueReferenceProps) => {
  if (!value) return null

  // Handle the case where venue is just a reference
  // if (value.venue && value.venue._ref && !value.venue._id) {
  //   return (
  //     <Link className={styles.venueReferenceInline} href='#'>
  //       {children || 'Venue'}
  //     </Link>
  //   )
  // }

  const venue = value.venue
  // if (!venue) return null

  const venueName = venue.name || 'Venue'
  const venueUrl = venue.slug?.current ? `/venues/${venue.slug.current}` : '#'

  // Handle inline display
  const isInline =
    markType === 'venueReference' || value.displayStyle === 'inline'
  if (isInline) {
    return <Link href={venueUrl}>🏟️ {children || venueName}</Link>
  }

  // Card style - compact card
  if (value.displayStyle === 'card') {
    return (
      <div className={`${styles.venueReference} ${styles.venueReferenceCard}`}>
        <Link href={venueUrl}>
          <div className={styles.venueCardContent}>
            <h4 className={styles.venueCardTitle}>{venue.name || 'Venue'}</h4>
            {venue.location && (
              <p className={styles.venueCardLocation}>{venue.location}</p>
            )}
          </div>
        </Link>
      </div>
    )
  }

  // Full style - comprehensive display
  return (
    <div className={`${styles.venueReference} ${styles.venueReferenceFull}`}>
      {venue.mainImage && (
        <div className={styles.venueImageContainer}>
          <Image
            src={urlForImage(venue.mainImage).width(600).url()}
            alt={venue.name || 'Venue image'}
            fill
            className='object-cover'
          />
        </div>
      )}
      <div className={styles.venueFullContent}>
        <h3 className={styles.venueFullTitle}>{venue.name || 'Venue'}</h3>
        {venue.location && (
          <p className={styles.venueFullLocation}>📍 {venue.location}</p>
        )}
        {venue.description && (
          <p className={styles.venueFullDescription}>{venue.description}</p>
        )}
        <Link href={venueUrl} className={styles.venueButton}>
          View Venue Details
        </Link>
      </div>
    </div>
  )
}

// Export the components object for PortableText
export const portableTextComponents = {
  types: {
    image: ImageComponent,
    videoEmbed: VideoEmbedComponent,
    audioFile: AudioComponent,
    eventReference: EventReferenceComponent,
    venueReference: VenueReferenceComponent,
  },
  marks: {
    eventReference: ({ children, value }: EventReferenceProps) => (
      <EventReferenceComponent value={value} markType='eventReference'>
        {children}
      </EventReferenceComponent>
    ),
    venueReference: ({ children, value }: VenueReferenceProps) => (
      <VenueReferenceComponent value={value} markType='venueReference'>
        {children}
      </VenueReferenceComponent>
    ),
  },
}
