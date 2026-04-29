import Image from 'next/image'
import Button from './Button'
import styles from './EventTeaser.module.css'
import dateFormatter from '@/lib/dateFormatter'
import { EventType } from '@/lib/sanityQueries'

function getDisplayPrice(price: EventType['price']): string | null {
  if (price === null || price === undefined) return null
  if (typeof price === 'string' && price.trim() === '') return null
  if (price === 0 || price === '0') return 'Free'
  return `${price}`
}

/** Prefer city/state when present; otherwise use venue name. TBA only when date is effectively all we have. */
function getPublicLocationParts(venue: EventType['venue']): {
  primary: string
  showVenueNameBelow: boolean
} {
  if (!venue) {
    return { primary: 'To Be Announced', showVenueNameBelow: false }
  }

  const city = venue.address?.city?.trim()
  const state = venue.address?.state?.trim()
  const venueName = venue.name?.trim()

  if (city || state) {
    const locality = [city, state].filter(Boolean).join(', ')
    return {
      primary: locality,
      showVenueNameBelow: !!venueName,
    }
  }

  if (venueName) {
    return { primary: venueName, showVenueNameBelow: false }
  }

  const freeformLocation = venue.location?.trim()
  if (freeformLocation) {
    return { primary: freeformLocation, showVenueNameBelow: false }
  }

  return { primary: 'To Be Announced', showVenueNameBelow: false }
}

export default function EventTeaser({ event }: { event: EventType }) {
  const dateInfo = event.date ? dateFormatter(event.date) : null
  const displayPrice = getDisplayPrice(event.price)
  const isPrivate = !!event.privateEvent
  const locationParts = getPublicLocationParts(event.venue)

  return (
    <div className={styles.eventTeaser}>
      {/* Image container with overlay */}
      <div className={styles.imageContainer}>
        {event.thumbnail?.url && (
          <>
            <Image
              src={event.thumbnail.url}
              alt={event.thumbnail?.alt || ''}
              className={styles.eventImage}
              fill
              sizes='100vw'
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.overlayDark}></div>
          </>
        )}
        <div className={styles.overlayLight}></div>
      </div>

      {/* Content stays in normal flow */}
      <div className={styles.content}>
        <div className={styles.date}>
          <h4>{dateInfo?.weekdayFull}</h4>
          <h2>
            {dateInfo ? `${dateInfo.monthFull} ${dateInfo.dayWithOrdinal}` : ''}
          </h2>
          {!isPrivate && (
            <span className={styles.longText}>{event.time}</span>
          )}
        </div>

        <div className={styles.location}>
          {!isPrivate && (
            <h3 className={styles.eventName}>{event.eventName || ''}</h3>
          )}
          <h2>
            {isPrivate ? 'Private Event' : locationParts.primary}
          </h2>
          {!isPrivate &&
            locationParts.showVenueNameBelow &&
            event.venue?.name && <h4>{event.venue.name}</h4>}
        </div>

        <div className={styles.actions}>
          {/* Price display */}
          {!isPrivate && (
            <span className={styles.longText}>
              {event.soldOut ? 'Sold Out!' : displayPrice}
            </span>
          )}
          {/* Slug only controls details URL — not venue or other fields */}
          {!isPrivate && event.slug && (
            <Button
              variant='primary'
              size='lg'
              href={`/events/${event.slug}`}
              className={styles.secondaryButton}
              fullWidth
            >
              View Details
            </Button>
          )}
          {!isPrivate && event.getTickets && (
            <Button
              href={event.getTickets}
              variant='secondary'
              disabled={event.soldOut}
              size='lg'
              className={styles.CTAButton}
              fullWidth
            >
              Get Tickets
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
