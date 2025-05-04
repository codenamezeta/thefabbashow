import Image from 'next/image'
import Button from './Button'
import styles from './EventTeaser.module.css'
import dateFormatter from '@/lib/dateFormatter'
import { EventType } from '@/lib/sanityQueries'

export default function EventTeaser({ event }: { event: EventType }) {
  const dateInfo = event.date ? dateFormatter(event.date) : null

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
          <span className={styles.longText}>{event.time}</span>
        </div>

        <div className={styles.location}>
          <h3 className={styles.eventName}>{event.eventName || ''}</h3>
          <h2>
            {event.venue
              ? `${event.venue?.address?.city}, ${event.venue?.address?.state}`
              : 'To Be Announced'}
          </h2>
          <h4>{event.venue?.name}</h4>
        </div>

        <div className={styles.actions}>
          {/* Price display */}
          <span className={styles.longText}>
            {event.soldOut ? 'Sold Out!' : event.price}
          </span>
          {/* Buttons */}
          {event.slug && (
            <Button
              variant='secondary'
              size='lg'
              href={`/events/${event.slug}`}
              className={styles.secondaryButton}
              fullWidth
            >
              View Details
            </Button>
          )}
          {event.getTickets && (
            <Button
              href={event.getTickets}
              variant='primary'
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
